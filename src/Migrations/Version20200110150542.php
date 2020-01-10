<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use App\Entity\ProductTag;
use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;
use Symfony\Component\DependencyInjection\ContainerAwareInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200110150542 extends AbstractMigration implements ContainerAwareInterface
{
    private $container;

    public function setContainer(ContainerInterface $container = null)
    {
        $this->container = $container;
    }

    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        $entityManager = $this->container->get('doctrine.orm.entity_manager');

        $productTag = new ProductTag();
        foreach ($this->container->getParameter('a2lix_translation_form.locales') as $lang) {
            $productTag->translate($lang)->setName('Google Merchant Category');
        }
        $productTag->setType('enum');
        $productTag->setInputType('multiple');
        $productTag->setVisible(ProductTag::VISIBLE_YES);

        $entityManager->persist($productTag);
        $productTag->mergeNewTranslations();
        $entityManager->flush();
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs

    }
}
