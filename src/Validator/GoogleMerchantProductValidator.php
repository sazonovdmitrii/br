<?php

namespace App\Validator;

use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\Validator\ConstraintValidator;
use Symfony\Component\Validator\Validation;

class GoogleMerchantProductValidator extends ConstraintValidator
{
    public function validate($data, Constraint $constraint)
    {
        /* @var $constraint \App\Validator\GoogleMerchantProduct */
        $dataConstraint = new Assert\Collection([
            'id'              => new Assert\NotBlank(),
            'title'           => new Assert\NotBlank(),
            'description'     => new Assert\NotBlank(),
            'image'           => new Assert\NotBlank(),
            'availability'    => new Assert\NotBlank(),
            'price'           => new Assert\NotBlank(),
            'google_category' => new Assert\NotBlank(),
            'brand'           => new Assert\NotBlank(),
            'gtin'            => new Assert\NotBlank(),
            'condition'       => new Assert\NotBlank(),
            'link'            => new Assert\NotBlank()
        ]
        );

        $validator  = Validation::createValidator();
        $violations = $validator->validate($data, $dataConstraint);

        if ($violations->count() && isset($data['id'])) {
            $this->context->buildViolation($constraint->message)
                ->setParameter('{{ value }}', $data['id'])
                ->addViolation();
        }
    }
}
