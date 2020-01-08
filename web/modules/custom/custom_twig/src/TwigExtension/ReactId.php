<?php

namespace Drupal\custom_twig\TwigExtension;

use Twig\TwigFunction;

/**
 * Class reactId.
 */
class ReactId extends \Twig_Extension {

  /**
   * {@inheritdoc}
   */
  public function getFunctions() {
    return [
      new TwigFunction('react_component', [$this, 'setId']),
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function setId($id) {

    return [
      '#attached' => [
        'library' => [
          'eighteenfsub/react',
          'eighteenfsub/' . $id . '',
        ],
      ],
      '#markup' => '<div id="' . $id . '"></div>',
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function getName() {
    return 'react_component.twig.extension';
  }

}
