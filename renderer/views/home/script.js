let clickListener = null;

export function init(root) {
  const btn = root.querySelector("#logNew");
  if (!btn) return;

  clickListener = () =>
    document.querySelector('.sidebarBtn[data-view="log"]').click();

  btn.addEventListener("click", clickListener);
}

export function destroy() {
  const btn = document.querySelector("#logNew");
  if (btn && clickListener) btn.removeEventListener("click", clickListener);
  clickListener = null;
}
