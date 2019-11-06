<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20191106140204 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('DROP SEQUENCE Зфpageurl_id_seq CASCADE');
        $this->addSql('CREATE SEQUENCE LenseItemTag_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE ДLenseItemTag_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE LenseTag_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE LenseItemTag (id INT NOT NULL, entity_id INT DEFAULT NULL, name VARCHAR(255) DEFAULT NULL, created TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, visible BOOLEAN DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_EC0FE38781257D5D ON LenseItemTag (entity_id)');
        $this->addSql('CREATE TABLE ДLenseItemTag (id INT NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE LenseTag (id INT NOT NULL, name VARCHAR(255) NOT NULL, created TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, visible VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('ALTER TABLE LenseItemTag ADD CONSTRAINT FK_EC0FE38781257D5D FOREIGN KEY (entity_id) REFERENCES LenseTag (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('DROP TABLE "Зфpageurl"');
        $this->addSql('ALTER TABLE productitem DROP name');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE LenseItemTag DROP CONSTRAINT FK_EC0FE38781257D5D');
        $this->addSql('DROP SEQUENCE LenseItemTag_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE ДLenseItemTag_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE LenseTag_id_seq CASCADE');
        $this->addSql('CREATE SEQUENCE Зфpageurl_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE "Зфpageurl" (id INT NOT NULL, PRIMARY KEY(id))');
        $this->addSql('DROP TABLE LenseItemTag');
        $this->addSql('DROP TABLE ДLenseItemTag');
        $this->addSql('DROP TABLE LenseTag');
        $this->addSql('ALTER TABLE ProductItem ADD name VARCHAR(255) DEFAULT NULL');
    }
}
