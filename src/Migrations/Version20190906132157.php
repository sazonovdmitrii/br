<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20190906132157 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SEQUENCE ProductItemTag_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE ProductItemTag (id INT NOT NULL, name VARCHAR(255) DEFAULT NULL, created TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, image VARCHAR(255) DEFAULT NULL, slug VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE productitemtag_productitem (productitemtag_id INT NOT NULL, productitem_id INT NOT NULL, PRIMARY KEY(productitemtag_id, productitem_id))');
        $this->addSql('CREATE INDEX IDX_31122AD2397183CD ON productitemtag_productitem (productitemtag_id)');
        $this->addSql('CREATE INDEX IDX_31122AD28920F479 ON productitemtag_productitem (productitem_id)');
        $this->addSql('ALTER TABLE productitemtag_productitem ADD CONSTRAINT FK_31122AD2397183CD FOREIGN KEY (productitemtag_id) REFERENCES ProductItemTag (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE productitemtag_productitem ADD CONSTRAINT FK_31122AD28920F479 FOREIGN KEY (productitem_id) REFERENCES ProductItem (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE productitemtag_productitem DROP CONSTRAINT FK_31122AD2397183CD');
        $this->addSql('DROP SEQUENCE ProductItemTag_id_seq CASCADE');
        $this->addSql('DROP TABLE ProductItemTag');
        $this->addSql('DROP TABLE productitemtag_productitem');
    }
}
