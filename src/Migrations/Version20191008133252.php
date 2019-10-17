<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20191008133252 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

//        $this->addSql('DROP SEQUENCE name_id_seq CASCADE');
//        $this->addSql('CREATE SEQUENCE Translation_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
  //      $this->addSql('CREATE TABLE Translation (id INT NOT NULL, source VARCHAR(2560) DEFAULT NULL, goal VARCHAR(2560) DEFAULT NULL, language VARCHAR(5) DEFAULT NULL, PRIMARY KEY(id))');
  //      $this->addSql('DROP TABLE name');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP SEQUENCE Translation_id_seq CASCADE');
        $this->addSql('CREATE SEQUENCE name_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE name (id INT NOT NULL, PRIMARY KEY(id))');
        $this->addSql('DROP TABLE Translation');
    }
}
