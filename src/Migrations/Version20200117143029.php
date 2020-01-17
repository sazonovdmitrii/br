<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200117143029 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SEQUENCE ProductCollection_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE ProductCollectionUrl_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE ProductCollection (id INT NOT NULL, name VARCHAR(255) DEFAULT NULL, description TEXT DEFAULT NULL, created TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, updated TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE productcollection_product (productcollection_id INT NOT NULL, product_id INT NOT NULL, PRIMARY KEY(productcollection_id, product_id))');
        $this->addSql('CREATE INDEX IDX_FF46F2CF86B6163F ON productcollection_product (productcollection_id)');
        $this->addSql('CREATE INDEX IDX_FF46F2CF4584665A ON productcollection_product (product_id)');
        $this->addSql('CREATE TABLE ProductCollectionUrl (id INT NOT NULL, url VARCHAR(255) DEFAULT NULL, created TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, productCollection_id INT DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_854ECBBF35C85DCA ON ProductCollectionUrl (productCollection_id)');
        $this->addSql('ALTER TABLE productcollection_product ADD CONSTRAINT FK_FF46F2CF86B6163F FOREIGN KEY (productcollection_id) REFERENCES ProductCollection (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE productcollection_product ADD CONSTRAINT FK_FF46F2CF4584665A FOREIGN KEY (product_id) REFERENCES Product (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE ProductCollectionUrl ADD CONSTRAINT FK_854ECBBF35C85DCA FOREIGN KEY (productCollection_id) REFERENCES ProductCollection (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE productcollection_product DROP CONSTRAINT FK_FF46F2CF86B6163F');
        $this->addSql('ALTER TABLE ProductCollectionUrl DROP CONSTRAINT FK_854ECBBF35C85DCA');
        $this->addSql('DROP SEQUENCE ProductCollection_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE ProductCollectionUrl_id_seq CASCADE');
        $this->addSql('DROP TABLE ProductCollection');
        $this->addSql('DROP TABLE productcollection_product');
        $this->addSql('DROP TABLE ProductCollectionUrl');
    }
}
