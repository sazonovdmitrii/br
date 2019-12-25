<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20191225074537 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE TABLE landingblock_landingblock (landingblock_source INT NOT NULL, landingblock_target INT NOT NULL, PRIMARY KEY(landingblock_source, landingblock_target))');
        $this->addSql('CREATE INDEX IDX_6D657DF6EB1EE8A9 ON landingblock_landingblock (landingblock_source)');
        $this->addSql('CREATE INDEX IDX_6D657DF6F2FBB826 ON landingblock_landingblock (landingblock_target)');
        $this->addSql('ALTER TABLE landingblock_landingblock ADD CONSTRAINT FK_6D657DF6EB1EE8A9 FOREIGN KEY (landingblock_source) REFERENCES LandingBlock (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE landingblock_landingblock ADD CONSTRAINT FK_6D657DF6F2FBB826 FOREIGN KEY (landingblock_target) REFERENCES LandingBlock (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP TABLE landingblock_landingblock');
    }
}
