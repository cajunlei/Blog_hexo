Element.prototype.siblings = function () {
  let siblingElement = [];
  let sibs = this.parentNode.querySelectorAll('.movies_item');
  for (let i = 0; i < sibs.length; i++) {
      if (sibs[i] !== this) {
          siblingElement.push(sibs[i]);
      }
  }
  return siblingElement;
};
function makePageNum(num, arr) {
  return (num + 1) + ' / ' + (Math.ceil(arr.length / 6 === 0 ? 1 : Math.ceil(arr.length / 6)));
}
function firstBtn() {
  let sibs = this.parentNode.siblings();
  displayPage(sibs, 0);
  this.parentNode.getElementsByClassName('movies-pagenum')[0].innerText = makePageNum(0, sibs);
}
function previousBtn() {
  let sibs = this.parentNode.siblings();
  let currNum = this.parentNode.getElementsByClassName('movies-pagenum')[0].innerText;
  currNum = currNum.substr(0, currNum.indexOf('/') - 1);
  currNum = parseInt(currNum, 6) - 1;
  if (currNum > 0) {
      currNum--;
  }
  displayPage(sibs, currNum);
  this.parentNode.getElementsByClassName('movies-pagenum')[0].innerText = makePageNum(currNum, sibs);
}
function nextBtn() {
  let sibs = this.parentNode.siblings();
  let currNum = this.parentNode.getElementsByClassName('movies-pagenum')[0].innerText;
  currNum = currNum.substr(0, currNum.indexOf('/') - 1);
  currNum = parseInt(currNum, 6) - 1;
  if (currNum < Math.ceil(sibs.length / 6) - 1) {
      currNum++;
  }
  displayPage(sibs, currNum);
  this.parentNode.getElementsByClassName('movies-pagenum')[0].innerText = makePageNum(currNum, sibs);
}
function lastBtn() {
  let sibs = this.parentNode.siblings();
  displayPage(sibs, Math.ceil(sibs.length / 6) - 1);
  this.parentNode.getElementsByClassName('movies-pagenum')[0].innerText = makePageNum(Math.ceil(sibs.length / 6) - 1 === -1 ? 0 : Math.ceil(sibs.length / 6) - 1, sibs);
}
function displayPage(arr, num) {
  for (let i = 0; i < arr.length; i++) {
      if (Math.floor(i / 6) === num) {
          arr[i].classList.remove('movies-hide');
      } else {
          arr[i].classList.add('movies-hide');
      }
  }
}
function initPagination() {
  let firstpages = document.getElementsByClassName("movies-firstpage");
  let previouspages = document.getElementsByClassName("movies-previouspage");
  let nextpages = document.getElementsByClassName("movies-nextpage");
  let lastpages = document.getElementsByClassName("movies-lastpage");
  let pagenums = document.getElementsByClassName("movies-pagenum");
  for (let i = 0; i < firstpages.length; i++) {
      //add listener
      firstpages[i].onclick = firstBtn;
      previouspages[i].onclick = previousBtn;
      nextpages[i].onclick = nextBtn;
      lastpages[i].onclick = lastBtn;
      //set page num
      let size = pagenums[i].parentNode.siblings().length;
      pagenums[i].innerText = '1 / ' + (Math.ceil(size / 6) === 0 ? 1 : Math.ceil(size / 6));
      firstpages[i].click();
  }
}
document.addEventListener("DOMContentLoaded", function () {
  initPagination();
}, false);