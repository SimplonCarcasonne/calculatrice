(function(){
  var math = {
    addition: function (a, b) {
      return parseInt(a, 10) + parseInt(b, 10);
    },
    divice: function (a, b) {
      if (b > 0) {
        return a/b;
      }
      return "error";
    },
    soustract: function (a, b) {
      return a-b;
    },
    multiply: function (a, b) {
      return a*b;
    }
  }

  var app = {
    arraySum: [],
    arraySumFilter: [],
    init: function () {
      this.listener();
      $('#resolve').on('click', this.resolve.bind(this));
      this.resetListener();
    },
    listener: function () {
      let self = this;
      $('button').on('click', function(){
        self.addElementOnArraySum(self.getDataContent(this));
        self.updateView();
      });
    },
    getDataContent: function (dom) {
      return $(dom).data('content');
    },
    addElementOnArraySum: function (element) {
      this.arraySum.push(element);
    },
    updateView: function () {
      var view = this.arraySum.join('');
      $('#view').html(view);
    },
    resetListener: function () {
      let self = this;
      $('#reset').on('click', function() {
        self.resetAll(self);
      });
    },
    resetAll : function (self) {
      self.resetSumFiler();
      self.resetSum();
      self.resetView();
    },
    resetView: function () {
      $('#view').html('');
      $('#result').html('');
    },
    resetSumFiler: function () {
      return this.arraySumFilter = [];
    },
    resetSum: function () {
      return this.arraySum = [];
    },
    resolve: function () {
      this.getArraySumFilter();
      this.getSum();
    },
    getSum: function () {
      var result = 0;
      this.checkMultiplyOrDivice();
      console.log(this.arraySumFilter);
      for (var i = 0; i < this.arraySumFilter.length; i++) {
        if(result === 0){
          result = this.arraySumFilter[0];
        }
        if(this.arraySumFilter[i] === "-"){
          result = math.soustract(result, this.arraySumFilter[i+1]);
        }
        if(this.arraySumFilter[i] === '+'){
          result = math.addition(result, this.arraySumFilter[i+1]);
        }
        if(this.arraySumFilter[i] === '/'){
          result = math.divice(result, this.arraySumFilter[i+1]);
        }
      }
      $('#result').html(result);
    },
    checkMultiplyOrDivice: function () {
      for (var i = this.arraySumFilter.length; i > 0; i--) {
        if(this.arraySumFilter[i] === '*'){
          this.arraySumFilter.splice(i-1, 3, math.multiply(this.arraySumFilter[i-1], this.arraySumFilter[i+1]));
        }
        if(this.arraySumFilter[i] === '/'){
          this.arraySumFilter.splice(i-1, 3, math.divice(this.arraySumFilter[i-1], this.arraySumFilter[i+1]));
        }
      }
      return this.arraySumFilter;
    },
    getArraySumFilter: function () {
      var number = "";
      var array = [];
      arraySumLenght = this.arraySum.length;
      for(var i = 0; i < arraySumLenght; i++){
        if(typeof this.arraySum[i] === "string"){
          array.push(number, this.arraySum[i]);
          number = "";
        }else{
          number = number + this.arraySum[i];
        }
      }
      return this.arraySumFilter = array;
    }
   }

  app.init();
})();
