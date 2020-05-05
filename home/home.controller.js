class HomeCtrl {
  constructor($scope, Upload, vcRecaptchaService, $http, isMobile, addPhotoText) {
    'ngInject';

    $scope.step = 5;
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
    $scope.cbExpiration = cbExpiration;
    $scope.getRateBtnClass = getRateBtnClass;
    $scope.currentForm = {};
    $scope.setForm = form => $scope.currentForm = form;
    $scope.close = close;
    $scope.isMobile = isMobile;
    $scope.addPhotoText = addPhotoText;

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
            if ($scope.currentForm.$invalid) {
                angular.forEach($scope.currentForm.$error, function (field) {
                    angular.forEach(field, function(errorField){
                        if (errorField) {
                            errorField.$setTouched();
                        }
                    })
                });

                return;
            }

            const url = Routing.generate('new_product_review', {product: productId});
            const upload = Upload.upload({
                url,
                method: 'POST',
                data: Object.assign({
                    file: $scope.photo,
                    recaptcha: $scope.recaptchaResponse,
                    rating: $scope.currentRate,
                    content: $scope.reviewContent,
                }, $scope.user),
            });

            upload.catch(e => notifications.danger('File upload error.'));
            upload.finally(() => ++$scope.step);
        }
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

    function fileFromInput($files, $file, $newFiles, $duplicateFiles, $invalidFiles, $event) {
        $scope.errors = [];
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
    }

    function getRateBtnClass(rateNumber, isSelected) {
        const classes = ['rate-btn', `rate-${rateNumber}`];

        if (isSelected) {
            classes.push('rate-btn-selected');
        }

        return classes;
    }

    function close() {
        $uibModalInstance.close();
    }


  }
}

export default HomeCtrl;