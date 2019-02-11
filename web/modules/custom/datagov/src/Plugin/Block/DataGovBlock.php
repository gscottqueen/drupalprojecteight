<?php

namespace Drupal\datagov\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a 'DataGovBlock' block.
 *
 * @Block(
 *  id = "datagov_block",
 *  admin_label = @Translation("Data Gov block"),
 * )
 */
class DataGovBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  
  public function build() {

    return [
      '#theme' => 'datagov_block',
      '#test_var' => $this->t('Data Goes Here'),
    ];
  }

}
