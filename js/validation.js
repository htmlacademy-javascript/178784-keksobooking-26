
function validateForm() {
  const form = document.querySelector('.ad-form');
  const pristine = new Pristine(form);

  form.addEventListener('submit', (evt) => {
    console.log('submit');
    evt.preventDefault();
    const isValid = pristine.validate();
    console.log(isValid);
  });
}

export { validateForm };
