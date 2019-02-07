<?php
/**
 * @file
 * Contains \Drupal\moduleone\Controller\ModuleOneController.
 */
 
namespace Drupal\moduleone\Controller;
 
use Drupal\Core\Controller\ControllerBase;
 
class ModuleOneController extends ControllerBase {
  public function content() {
    return array(
      '#type' => 'markup',
      '#markup' => '<div id="data-gov-react-app" />',
    );
  }
}