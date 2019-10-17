<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20191017124412 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SEQUENCE StoreUrl_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE ЗфPageUrl_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE StoreUrl (id INT NOT NULL, entity_id INT DEFAULT NULL, url VARCHAR(255) DEFAULT NULL, created TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_E39E0C3981257D5D ON StoreUrl (entity_id)');
        $this->addSql('CREATE TABLE ЗфPageUrl (id INT NOT NULL, PRIMARY KEY(id))');
        $this->addSql('ALTER TABLE StoreUrl ADD CONSTRAINT FK_E39E0C3981257D5D FOREIGN KEY (entity_id) REFERENCES Store (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP SEQUENCE StoreUrl_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE ЗфPageUrl_id_seq CASCADE');
        $this->addSql('DROP TABLE StoreUrl');
        $this->addSql('DROP TABLE ЗфPageUrl');
    }
}
