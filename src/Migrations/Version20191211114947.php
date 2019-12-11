<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20191211114947 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE TABLE lense_lenseitemtag (lense_id INT NOT NULL, lenseitemtag_id INT NOT NULL, PRIMARY KEY(lense_id, lenseitemtag_id))');
        $this->addSql('CREATE INDEX IDX_4B1F8C00229CE6F9 ON lense_lenseitemtag (lense_id)');
        $this->addSql('CREATE INDEX IDX_4B1F8C00A7E34D1F ON lense_lenseitemtag (lenseitemtag_id)');
        $this->addSql('ALTER TABLE lense_lenseitemtag ADD CONSTRAINT FK_4B1F8C00229CE6F9 FOREIGN KEY (lense_id) REFERENCES Lense (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE lense_lenseitemtag ADD CONSTRAINT FK_4B1F8C00A7E34D1F FOREIGN KEY (lenseitemtag_id) REFERENCES LenseItemTag (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP TABLE lense_lenseitemtag');
    }
}
