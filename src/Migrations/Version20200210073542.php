<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200210073542 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('ALTER TABLE orders DROP CONSTRAINT fk_e283f8d8a0ce293e');
        $this->addSql('DROP INDEX idx_e283f8d8a0ce293e');
        $this->addSql('ALTER TABLE orders DROP payment_method_id_id');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE Orders ADD payment_method_id_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE Orders ADD CONSTRAINT fk_e283f8d8a0ce293e FOREIGN KEY (payment_method_id_id) REFERENCES paymentmethod (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX idx_e283f8d8a0ce293e ON Orders (payment_method_id_id)');
    }
}
