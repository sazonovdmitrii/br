<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20191001094006 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

//        $this->addSql('DROP SEQUENCE Иblock_id_seq CASCADE');
//        $this->addSql('CREATE SEQUENCE Store_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
//        $this->addSql('CREATE SEQUENCE Name_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
//        $this->addSql('CREATE TABLE Store (id INT NOT NULL, name VARCHAR(255) DEFAULT NULL, full_name VARCHAR(255) DEFAULT NULL, city VARCHAR(255) DEFAULT NULL, visible BOOLEAN DEFAULT NULL, longitude VARCHAR(255) DEFAULT NULL, latitude VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id))');
//        $this->addSql('CREATE TABLE Name (id INT NOT NULL, PRIMARY KEY(id))');
//        $this->addSql('DROP TABLE "Иblock"');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP SEQUENCE Store_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE Name_id_seq CASCADE');
        $this->addSql('CREATE SEQUENCE Иblock_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE "Иblock" (id INT NOT NULL, PRIMARY KEY(id))');
        $this->addSql('DROP TABLE Store');
        $this->addSql('DROP TABLE Name');
    }
}
