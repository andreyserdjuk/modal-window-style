class HomeCtrl {
  constructor($scope, Upload, vcRecaptchaService) {
    'ngInject';

    $scope.step = 1;
    $scope.headerColor = 'green';
    $scope.titles = {
      1: 'How would your rate this product?',
      2: 'Upload a photo of a product (optional)',
      3: 'Tell us more about the product',
      4: 'Provide personal details',
    };

    $scope.rates = [
      { rate: 5, title: 'Love it' },
      { rate: 4, title: 'Like it' },
      { rate: 3, title: 'It\'s okay' },
      { rate: 2, title: 'I didn\'t like it' },
      { rate: 1, title: 'Hate it' },
    ];
    $scope.errors = [];
    $scope.isMobile = detectMob();

    // user input
    $scope.currentRate = null;
    $scope.photo = null;
    $scope.reviewContent = '';
    $scope.user = {};
    $scope.recaptchaResponse = null;

    $scope.next = next;
    $scope.setRate = setRate;
    $scope.back = back;
    $scope.triggerInputClick = triggerInputClick;
    $scope.fileFromInput = fileFromInput;
    $scope.trimReview = trimReview;
    $scope.invalidFile = invalidFile;
    $scope.cbExpiration = cbExpiration;

    function setRate(rate) {
      $scope.currentRate = rate;
      $scope.next();
    }

    function next() {
      $scope.errors = [];
      if ($scope.step === 1) {
        if (!$scope.currentRate) {
          $scope.errors.push('Please leave your rate.');
          return;
        }
        $scope.step = 2;
        return;
      }

      if ($scope.step === 2) {
        ++$scope.step;
        return;
      }

      if ($scope.step === 3) {
        if (!$scope.reviewContent.length) {
          $scope.errors.push('Please leave your review.');
          return;
        }
        ++$scope.step;
        return;
      }

      if ($scope.step === 4) {
        console.log($scope.recaptchaResponse);
        console.log();
      }
    }

    function invalidFile(file) {
      console.log(file);
    }

    function trimReview() {
      if ($scope.reviewContent.length > 2048) {
        $scope.reviewContent = $scope.reviewContent.substring(0, 2047);
      }
    }

    function back() {
      $scope.errors = [];
      --$scope.step;
    }

    function triggerInputClick() {
      document.getElementById('upload-review-photo').click();
    }

    // function fileFromInput(files) {
    function fileFromInput($files, $file, $newFiles, $duplicateFiles, $invalidFiles, $event) {
      $scope.errors = [];
      console.log($files, $file, $newFiles, $duplicateFiles, $invalidFiles, $event);
      if ($invalidFiles.length) {
        const invalidFile = $invalidFiles[0];
        $scope.errors.push(`Invalid file: ${invalidFile.name}`);
        return;
      }

      if ($file !== undefined) {
        $scope.photo = $file;
        $scope.next();
      }
    }

    function cbExpiration() {
      vcRecaptchaService.reload($scope.widgetId);
      $scope.recaptchaResponse = null;
    };

    function detectMob() {
      const toMatch = [
          /Android/i,
          /webOS/i,
          /iPhone/i,
          /iPad/i,
          /iPod/i,
          /BlackBerry/i,
          /Windows Phone/i
      ];

      return toMatch.some((toMatchItem) => {
          return navigator.userAgent.match(toMatchItem);
      });
    }
  }
}

export default HomeCtrl;