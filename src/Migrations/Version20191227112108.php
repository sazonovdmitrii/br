<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20191227112108 extends AbstractMigration
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
        $this->addSql('CREATE TABLE landingblock_lense (landingblock_id INT NOT NULL, lense_id INT NOT NULL, PRIMARY KEY(landingblock_id, lense_id))');
        $this->addSql('CREATE INDEX IDX_72B2DE544EF12D50 ON landingblock_lense (landingblock_id)');
        $this->addSql('CREATE INDEX IDX_72B2DE54229CE6F9 ON landingblock_lense (lense_id)');
        $this->addSql('ALTER TABLE landingblock_landingblock ADD CONSTRAINT FK_6D657DF6EB1EE8A9 FOREIGN KEY (landingblock_source) REFERENCES LandingBlock (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE landingblock_landingblock ADD CONSTRAINT FK_6D657DF6F2FBB826 FOREIGN KEY (landingblock_target) REFERENCES LandingBlock (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE landingblock_lense ADD CONSTRAINT FK_72B2DE544EF12D50 FOREIGN KEY (landingblock_id) REFERENCES LandingBlock (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE landingblock_lense ADD CONSTRAINT FK_72B2DE54229CE6F9 FOREIGN KEY (lense_id) REFERENCES Lense (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP TABLE landingblock_landingblock');
        $this->addSql('DROP TABLE landingblock_lense');
    }
}
