<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20190905144353 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('DROP SEQUENCE Зproduct_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE Зкproduct_id_seq CASCADE');
        $this->addSql('CREATE SEQUENCE PageUrl_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE PageUrl (id INT NOT NULL, entity_id INT DEFAULT NULL, url VARCHAR(255) DEFAULT NULL, created TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_69819C0681257D5D ON PageUrl (entity_id)');
        $this->addSql('ALTER TABLE PageUrl ADD CONSTRAINT FK_69819C0681257D5D FOREIGN KEY (entity_id) REFERENCES Page (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('DROP TABLE "Зproduct"');
        $this->addSql('DROP TABLE "Зкproduct"');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP SEQUENCE PageUrl_id_seq CASCADE');
        $this->addSql('CREATE SEQUENCE Зproduct_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE Зкproduct_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE "Зproduct" (id INT NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE "Зкproduct" (id INT NOT NULL, PRIMARY KEY(id))');
        $this->addSql('DROP TABLE PageUrl');
    }
}
