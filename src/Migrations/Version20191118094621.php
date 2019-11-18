<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20191118094621 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('ALTER TABLE orders ADD courier_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE orders ADD pickup_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE orders ADD lenses TEXT DEFAULT NULL');
        $this->addSql('ALTER TABLE orders ADD CONSTRAINT FK_E283F8D8E3D8151C FOREIGN KEY (courier_id) REFERENCES Courier (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE orders ADD CONSTRAINT FK_E283F8D8C26E160B FOREIGN KEY (pickup_id) REFERENCES Pickup (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_E283F8D8E3D8151C ON orders (courier_id)');
        $this->addSql('CREATE INDEX IDX_E283F8D8C26E160B ON orders (pickup_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE Orders DROP CONSTRAINT FK_E283F8D8E3D8151C');
        $this->addSql('ALTER TABLE Orders DROP CONSTRAINT FK_E283F8D8C26E160B');
        $this->addSql('DROP INDEX IDX_E283F8D8E3D8151C');
        $this->addSql('DROP INDEX IDX_E283F8D8C26E160B');
        $this->addSql('ALTER TABLE Orders DROP courier_id');
        $this->addSql('ALTER TABLE Orders DROP pickup_id');
        $this->addSql('ALTER TABLE Orders DROP lenses');
    }
}
