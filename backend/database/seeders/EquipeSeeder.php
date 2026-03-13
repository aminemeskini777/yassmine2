<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Equipe;

class EquipeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $equipes = [
            ['nom' => 'Développement'],
            ['nom' => 'Ressources Humaines'],
            ['nom' => 'Marketing'],
            ['nom' => 'Commercial'],
            ['nom' => 'Support Technique'],
        ];

        foreach ($equipes as $equipe) {
            Equipe::create($equipe);
        }
    }
}
