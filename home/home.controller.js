class HomeCtrl {
  constructor($scope) {
    'ngInject';

    this.step = 4;
    this.headerColor = '#494949';
    this.titles = {
      1: 'How would your rate this product?',
      2: 'Upload a photo of a product (optional)',
    };

    this.rates = [
      { rate: 5, title: 'Love it' },
      { rate: 4, title: 'Like it' },
      { rate: 3, title: 'It\'s okay' },
      { rate: 2, title: 'I didn\'t like it' },
      { rate: 1, title: 'Hate it' },
    ];
    this.errors = [];
    this.currentRate = null;

    this.next = next;
    this.setRate = setRate;
    this.back = back;
    this.triggerInputClick = triggerInputClick;

    function setRate(rate) {
      this.currentRate = rate;
      this.next();
    }

    function next() {
      this.errors = [];
      if (this.step === 1) {
        if (!this.currentRate) {
          this.errors.push('Please leave your rate.');
          return;
        }
        this.step = 2;
        return;
      }
    }

    function back() {
      --this.step;
    }

    function onDragOver(event) {
        event.preventDefault();
        event.stopPropagation();
    }

    function triggerInputClick() {
      document.getElementById('upload-review-photo').click();
    }

    // DragEvent
    function fileFromDrop(event) {
      event.preventDefault();
      event.stopPropagation();

      if (event.dataTransfer.files.length) {
        this.handleUploadedFile(event.dataTransfer.files[0]);
      }
    }

    function fileFromInput(event) {
      const target = event.target;

      if (target.files.length) {
        this.handleUploadedFile(target.files[0]);
      }
    }

    function handleUploadedFile(file) {
      this.fileUploadError = '';
      this.dropZoneClass = '';

      // if (file.type !== 'text/csv') {
      //   this.dropZoneClass = 'invalid';
      //   this.fileUploadError = 'Only .csv files are supported.';
      //   return;
      // }

      this.nextStep();
    }
  }
}

export default HomeCtrl;