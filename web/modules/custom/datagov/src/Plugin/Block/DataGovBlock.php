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
      '#error' => $this->t('React did not render.'),
    ];
  }

}
