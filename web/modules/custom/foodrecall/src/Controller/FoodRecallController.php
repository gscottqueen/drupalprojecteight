<?php
/**
 * @file
 * Contains \Drupal\foodrecall\Controller\FoodRecallController.
 */
 
namespace Drupal\foodrecall\Controller;
 
use Drupal\Core\Controller\ControllerBase;
 
class FoodRecallController extends ControllerBase {
  public function content() {
    return array(
      '#type' => 'markup',
      '#markup' => '<div id="foodrecall"></div>',
    );
  }
}