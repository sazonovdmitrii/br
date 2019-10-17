<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20190923103436 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

//        $this->addSql('CREATE SEQUENCE Block_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
//        $this->addSql('CREATE SEQUENCE ИBlock_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
//        $this->addSql('CREATE TABLE Block (id INT NOT NULL, title VARCHAR(255) DEFAULT NULL, name VARCHAR(255) DEFAULT NULL, content TEXT DEFAULT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, PRIMARY KEY(id))');
//        $this->addSql('CREATE TABLE ИBlock (id INT NOT NULL, PRIMARY KEY(id))');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP SEQUENCE Block_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE ИBlock_id_seq CASCADE');
        $this->addSql('DROP TABLE Block');
        $this->addSql('DROP TABLE ИBlock');
    }
}
