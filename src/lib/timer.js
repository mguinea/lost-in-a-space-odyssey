function Timer(){
    this.ini = Date.now();

    this.now = function(){
        return Date.now();
    }

    this.start = function(){
        this.ini = this.now();
    }

    this.getElapsedTime = function(){
        return (this.now() - this.ini) / 1000;
    }

   this.reset = function(){
       this.ini = this.now();
   }

   this.clean = function(){
       this.ini = null;
   }
}
