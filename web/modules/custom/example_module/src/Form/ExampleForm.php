<?php

namespace Drupal\example_module\Form;

use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;

/**
 * Class ExampleForm.
 */
class ExampleForm extends ConfigFormBase {

  /**
   * {@inheritdoc}
   */
  protected function getEditableConfigNames() {
    return [
      'example_module.example',
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'example_form';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $config = $this->config('example_module.example');
    $form['input_content'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Example Field'),
      '#description' => $this->t('This is an example input form.'),
      '#maxlength' => 2000,
      '#size' => 500,
      '#default_value' => $config->get('input_content'),
    ];
    return parent::buildForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   */
  public function validateForm(array &$form, FormStateInterface $form_state) {
    parent::validateForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    parent::submitForm($form, $form_state);

    $this->config('example_module.example')
      ->set('input_content', $form_state->getValue('input_content'))
      ->save();
  }

}
