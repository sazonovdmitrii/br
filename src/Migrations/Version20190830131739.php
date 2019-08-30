<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20190830131739 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('DROP SEQUENCE products_id_seq CASCADE');
        $this->addSql('CREATE SEQUENCE ЗProduct_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE ЗкProduct_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE product_catalog (product_id INT NOT NULL, catalog_id INT NOT NULL, PRIMARY KEY(product_id, catalog_id))');
        $this->addSql('CREATE INDEX IDX_CAF529F74584665A ON product_catalog (product_id)');
        $this->addSql('CREATE INDEX IDX_CAF529F7CC3C66FC ON product_catalog (catalog_id)');
        $this->addSql('CREATE TABLE ЗProduct (id INT NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE ЗкProduct (id INT NOT NULL, PRIMARY KEY(id))');
        $this->addSql('ALTER TABLE product_catalog ADD CONSTRAINT FK_CAF529F74584665A FOREIGN KEY (product_id) REFERENCES Product (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE product_catalog ADD CONSTRAINT FK_CAF529F7CC3C66FC FOREIGN KEY (catalog_id) REFERENCES Catalog (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('DROP TABLE products');
        $this->addSql('ALTER TABLE city DROP title');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP SEQUENCE ЗProduct_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE ЗкProduct_id_seq CASCADE');
        $this->addSql('CREATE SEQUENCE products_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE products (id INT NOT NULL, PRIMARY KEY(id))');
        $this->addSql('DROP TABLE product_catalog');
        $this->addSql('DROP TABLE ЗProduct');
        $this->addSql('DROP TABLE ЗкProduct');
        $this->addSql('ALTER TABLE City ADD title VARCHAR(255) DEFAULT NULL');
    }
}
