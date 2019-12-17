<?php
namespace App\Form\Filter;

use Symfony\Component\OptionsResolver\Options;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\OptionsResolver\OptionsResolver;
use EasyCorp\Bundle\EasyAdminBundle\Configuration\ConfigManager;
use Symfony\Component\Form\ChoiceList\Factory\ChoiceListFactoryInterface;
use Symfony\Component\Form\ChoiceList\Factory\CachingFactoryDecorator;
use Symfony\Component\Form\ChoiceList\Factory\PropertyAccessDecorator;
use Symfony\Component\Form\ChoiceList\Factory\DefaultChoiceListFactory;
use App\Service\ConfigService;

class LensesTagsFilterType extends ChoiceType
{
    private $configService;

    public function __construct(
        ChoiceListFactoryInterface $choiceListFactory = null,
        ConfigService $configService
    ) {
        $this->configService = $configService;
        parent::__construct($choiceListFactory);
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $lenseTags = [];
        foreach($this->configService->getServiceConfig('lense_tags') as $item) {
            $lenseTags[$item['value']] = $item['key'];
        }

        $placeholderDefault = function (Options $options) {
            return $options['required'] ? null : '';
        };

        $compound = function (Options $options) {
            return $options['expanded'];
        };

        $resolver->setDefaults([
            'multiple' => false,
            'expanded' => false,
            'choices' => $lenseTags,
            'choice_loader' => null,
            'choice_label' => null,
            'choice_name' => null,
            'choice_value' => null,
            'choice_attr' => null,
            'preferred_choices' => [],
            'group_by' => null,
            'empty_data' => [],
            'placeholder' => $placeholderDefault,
            'error_bubbling' => false,
            'compound' => $compound,
            'data_class' => null,
            'choice_translation_domain' => true,
            'trim' => false,
        ]);
    }
}