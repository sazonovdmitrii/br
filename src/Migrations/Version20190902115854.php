<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20190902115854 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('ALTER TABLE productitemimage DROP CONSTRAINT fk_e157c992c684daac');
        $this->addSql('DROP INDEX idx_e157c992c684daac');
        $this->addSql('ALTER TABLE productitemimage ADD product_item_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE productitemimage DROP product_item_id_id');
        $this->addSql('ALTER TABLE productitemimage ADD CONSTRAINT FK_E157C992C3B649EE FOREIGN KEY (product_item_id) REFERENCES ProductItem (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_E157C992C3B649EE ON productitemimage (product_item_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE ProductItemImage DROP CONSTRAINT FK_E157C992C3B649EE');
        $this->addSql('DROP INDEX IDX_E157C992C3B649EE');
        $this->addSql('ALTER TABLE ProductItemImage ADD product_item_id_id INT NOT NULL');
        $this->addSql('ALTER TABLE ProductItemImage DROP product_item_id');
        $this->addSql('ALTER TABLE ProductItemImage ADD CONSTRAINT fk_e157c992c684daac FOREIGN KEY (product_item_id_id) REFERENCES productitem (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX idx_e157c992c684daac ON ProductItemImage (product_item_id_id)');
    }
}
