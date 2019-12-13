<?php
namespace App\Form\Filter;

use Symfony\Component\OptionsResolver\Options;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\OptionsResolver\OptionsResolver;
use EasyCorp\Bundle\EasyAdminBundle\Configuration\ConfigManager;

class LensesTagsFilterType extends ChoiceType
{

    public function configureOptions(OptionsResolver $resolver)
    {
        $emptyData = function (Options $options) {
            if ($options['expanded'] && !$options['multiple']) {
                return;
            }

            if ($options['multiple']) {
                return [];
            }

            return '';
        };

        $placeholderDefault = function (Options $options) {
            return $options['required'] ? null : '';
        };

        $placeholderNormalizer = function (Options $options, $placeholder) {
            if ($options['multiple']) {
                // never use an empty value for this case
                return;
            } elseif ($options['required'] && ($options['expanded'] || isset($options['attr']['size']) && $options['attr']['size'] > 1)) {
                // placeholder for required radio buttons or a select with size > 1 does not make sense
                return;
            } elseif (false === $placeholder) {
                // an empty value should be added but the user decided otherwise
                return;
            } elseif ($options['expanded'] && '' === $placeholder) {
                // never use an empty label for radio buttons
                return 'None';
            }

            // empty value has been set explicitly
            return $placeholder;
        };

        $compound = function (Options $options) {
            return $options['expanded'];
        };

        $choiceTranslationDomainNormalizer = function (Options $options, $choiceTranslationDomain) {
            if (true === $choiceTranslationDomain) {
                return $options['translation_domain'];
            }

            return $choiceTranslationDomain;
        };

        $resolver->setDefaults([
            'multiple' => false,
            'expanded' => false,
            'choices' => [
                'Простой' => 'simple',
                'Рецептурный' => 'receipt'
            ],
            'choice_loader' => null,
            'choice_label' => null,
            'choice_name' => null,
            'choice_value' => null,
            'choice_attr' => null,
            'preferred_choices' => [],
            'group_by' => null,
            'empty_data' => $emptyData,
            'placeholder' => $placeholderDefault,
            'error_bubbling' => false,
            'compound' => $compound,
            // The view data is always a string or an array of strings,
            // even if the "data" option is manually set to an object.
            // See https://github.com/symfony/symfony/pull/5582
            'data_class' => null,
            'choice_translation_domain' => true,
            'trim' => false,
        ]);

        $resolver->setNormalizer('placeholder', $placeholderNormalizer);
        $resolver->setNormalizer('choice_translation_domain', $choiceTranslationDomainNormalizer);

        $resolver->setAllowedTypes('choices', ['null', 'array', '\Traversable']);
        $resolver->setAllowedTypes('choice_translation_domain', ['null', 'bool', 'string']);
        $resolver->setAllowedTypes('choice_loader', ['null', 'Symfony\Component\Form\ChoiceList\Loader\ChoiceLoaderInterface']);
        $resolver->setAllowedTypes('choice_label', ['null', 'bool', 'callable', 'string', 'Symfony\Component\PropertyAccess\PropertyPath']);
        $resolver->setAllowedTypes('choice_name', ['null', 'callable', 'string', 'Symfony\Component\PropertyAccess\PropertyPath']);
        $resolver->setAllowedTypes('choice_value', ['null', 'callable', 'string', 'Symfony\Component\PropertyAccess\PropertyPath']);
        $resolver->setAllowedTypes('choice_attr', ['null', 'array', 'callable', 'string', 'Symfony\Component\PropertyAccess\PropertyPath']);
        $resolver->setAllowedTypes('preferred_choices', ['array', '\Traversable', 'callable', 'string', 'Symfony\Component\PropertyAccess\PropertyPath']);
        $resolver->setAllowedTypes('group_by', ['null', 'callable', 'string', 'Symfony\Component\PropertyAccess\PropertyPath']);
    }
}