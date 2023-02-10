Element.prototype.siblings = function () {
  let siblingElement = [];
  let sibs = this.parentNode.querySelectorAll('.flink_item');
  for (let i = 0; i < sibs.length; i++) {
    if (sibs[i] !== this) {
      siblingElement.push(sibs[i]);
    }
  }
  return siblingElement;
};
function initPagination() {
  let pagenums = document.getElementsByClassName("flink-num");
  for (let i = 0; i < pagenums.length; i++) {
    let size = pagenums[i].siblings().length;
    pagenums[i].innerText = '（' + (size === 0 ? 1 : size) + '）';
  }
}
initPagination();
