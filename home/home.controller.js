class HomeCtrl {
  constructor($scope, Upload) {
    'ngInject';

    $scope.step = 2;
    $scope.headerColor = '#494949';
    $scope.titles = {
      1: 'How would your rate this product?',
      2: 'Upload a photo of a product (optional)',
      3: 'Tell us more about the product',
    };

    $scope.rates = [
      { rate: 5, title: 'Love it' },
      { rate: 4, title: 'Like it' },
      { rate: 3, title: 'It\'s okay' },
      { rate: 2, title: 'I didn\'t like it' },
      { rate: 1, title: 'Hate it' },
    ];
    $scope.errors = [];

    // user input
    $scope.currentRate = null;
    $scope.photo = null;

    $scope.next = next;
    $scope.setRate = setRate;
    $scope.back = back;
    $scope.triggerInputClick = triggerInputClick;
    $scope.fileFromInput = fileFromInput;

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
      }
    }

    function back() {
      --$scope.step;
    }

    function triggerInputClick() {
      document.getElementById('upload-review-photo').click();
    }

    function fileFromInput(files) {
      if (files === undefined || !files[0]) {
        return;
      }
      $scope.photo = files[0];
      
      $scope.next();
    }
  }
}

export default HomeCtrl;