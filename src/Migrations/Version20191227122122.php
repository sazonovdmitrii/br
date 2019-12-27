<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20191227122122 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SEQUENCE LandingPage_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE LandingPage (id INT NOT NULL, name VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE landingpage_landingblock (landingpage_id INT NOT NULL, landingblock_id INT NOT NULL, PRIMARY KEY(landingpage_id, landingblock_id))');
        $this->addSql('CREATE INDEX IDX_B0E3A56077CF5E00 ON landingpage_landingblock (landingpage_id)');
        $this->addSql('CREATE INDEX IDX_B0E3A5604EF12D50 ON landingpage_landingblock (landingblock_id)');
        $this->addSql('ALTER TABLE landingpage_landingblock ADD CONSTRAINT FK_B0E3A56077CF5E00 FOREIGN KEY (landingpage_id) REFERENCES LandingPage (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE landingpage_landingblock ADD CONSTRAINT FK_B0E3A5604EF12D50 FOREIGN KEY (landingblock_id) REFERENCES LandingBlock (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE landingpage_landingblock DROP CONSTRAINT FK_B0E3A56077CF5E00');
        $this->addSql('DROP SEQUENCE LandingPage_id_seq CASCADE');
        $this->addSql('DROP TABLE LandingPage');
        $this->addSql('DROP TABLE landingpage_landingblock');
    }
}
