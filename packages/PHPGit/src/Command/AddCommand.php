<?php

namespace PHPGit\Command;

use PHPGit\Command;
use PHPGit\Exception\GitException;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Traversable;

/**
 * Add file contents to the index - `git add`
 *
 * @author Kazuyuki Hayashi <hayashi@valnur.net>
 */
class AddCommand extends Command
{

    /**
     * Add file contents to the index
     *
     * ``` php
     * $git = new PHPGit\Git();
     * $git->setRepository('/path/to/repo');
     * $git->add('file.txt');
     * $git->add('file.txt', ['force' => false, 'ignore-errors' => false);
     * ```
     *
     * ##### Options
     *
     * - **force**          (_boolean_) Allow adding otherwise ignored files
     * - **ignore-errors**  (_boolean_) Do not abort the operation
     *
     * @param string|array|Traversable $file Files to add content from
     * @param array $options [optional] An array of options {@see AddCommand::setDefaultOptions}
     *
     * @return bool
     * @throws GitException
     */
    public function __invoke($file, array $options = [])
    {
        $options = $this->resolve($options);
        $builder = $this->git->getProcessBuilder()
            ->add('add');

        $this->addFlags($builder, $options);

        if (!is_array($file) && !($file instanceof Traversable)) {
            $file = [$file];
        }

        foreach ($file as $value) {
            $builder->add($value);
        }

        $this->git->run($builder->getProcess());

        return true;
    }

    /**
     * {@inheritdoc}
     *
     * - **force**          (_boolean_) Allow adding otherwise ignored files
     * - **ignore-errors**  (_boolean_) Do not abort the operation
     */
    public function setDefaultOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            //'dry-run'        => false,
            'force'         => false,
            'ignore-errors' => false,
            //'ignore-missing' => false,
        ]);
    }

}
