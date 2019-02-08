<?php

namespace Drupal\example_module\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a 'ExampleModuleBlock' block.
 *
 * @Block(
 *  id = "example_module_block",
 *  admin_label = @Translation("Example module block"),
 * )
 */
class ExampleModuleBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  
  public function build() {
    return [
      '#theme' => 'example_module_block',
      '#test_var' => $this->t('Test Value'),
    ];
  }

}
