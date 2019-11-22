/* eslint-disable import/prefer-default-export */
import $ from 'jquery';

export function ColorInvalidElements(rootElement) {
  $(rootElement)
    .find('input:invalid')
    .addClass('border-danger')
    .removeClass('border-success')
    .end()
    .find('input:valid')
    .removeClass('border-danger')
    .addClass('border-success');
}
