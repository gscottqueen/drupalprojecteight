<?php

namespace Drupal\datagov\Form;

use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;

/**
 * Class ExampleForm.
 */
class DataGovForm extends ConfigFormBase {

  /**
   * {@inheritdoc}
   */
  protected function getEditableConfigNames() {
    return [
      'datagov.example',
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'datagov_form';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $config = $this->config('datagov.example');
    $form['input_content'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Enpoint URL'),
      '#description' => $this->t('Enter the endpoint URL that you would like to retrieve data from.'),
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

    $this->config('datagov.example')
      ->set('input_content', $form_state->getValue('input_content'))
      ->save();
  }

}
