<?php

namespace PHPGit\Command;

use PHPGit\Command;
use PHPGit\Exception\GitException;
use Symfony\Component\OptionsResolver\OptionsResolver;

/**
 * Get and set repository or global options - `git config`
 *
 * @author Kazuyuki Hayashi <hayashi@valnur.net>
 */
class ConfigCommand extends Command
{

    /**
     * Returns all variables set in config file
     *
     *
     * ##### Options
     *
     * - **global** (_boolean_) Read or write configuration options for the current user
     * - **system** (_boolean_) Read or write configuration options for all users on the current machine
     *
     * @param array $options [optional] An array of options {@see ConfigCommand::setDefaultOptions}
     *
     * @return array
     * @throws GitException
     */
    public function __invoke(array $options = [])
    {
        $options = $this->resolve($options);
        $builder = $this->git->getProcessBuilder()
            ->add('config')
            ->add('--list')
            ->add('--null');

        $this->addFlags($builder, $options, ['global', 'system']);

        $config = [];
        $output = $this->git->run($builder->getProcess());
        $lines = $this->split($output, true);

        foreach ($lines as $line) {
            [$name, $value] = explode("\n", $line, 2);

            if (isset($config[$name])) {
                $config[$name] .= "\n" . $value;
            } else {
                $config[$name] = $value;
            }
        }

        return $config;
    }

    /**
     * Set an option
     *
     * ##### Options
     *
     * - **global** (_boolean_) Read or write configuration options for the current user
     * - **system** (_boolean_) Read or write configuration options for all users on the current machine
     *
     * @param string $name The name of the option
     * @param string $value The value to set
     * @param array $options [optional] An array of options {@see ConfigCommand::setDefaultOptions}
     *
     * @return bool
     * @throws GitException
     */
    public function set($name, $value, array $options = [])
    {
        $options = $this->resolve($options);
        $builder = $this->git->getProcessBuilder()
            ->add('config');

        $this->addFlags($builder, $options, ['global', 'system']);

        $builder->add($name)->add($value);
        $process = $builder->getProcess();
        $this->git->run($process);

        return true;
    }

    /**
     * Adds a new line to the option without altering any existing values
     *
     * ##### Options
     *
     * - **global** (_boolean_) Read or write configuration options for the current user
     * - **system** (_boolean_) Read or write configuration options for all users on the current machine
     *
     * @param string $name The name of the option
     * @param string $value The value to add
     * @param array $options [optional] An array of options {@see ConfigCommand::setDefaultOptions}
     *
     * @return bool
     * @throws GitException
     */
    public function add($name, $value, array $options = [])
    {
        $options = $this->resolve($options);
        $builder = $this->git->getProcessBuilder()
            ->add('config');

        $this->addFlags($builder, $options, ['global', 'system']);

        $builder->add('--add')->add($name)->add($value);
        $process = $builder->getProcess();
        $this->git->run($process);

        return true;
    }

    /**
     * {@inheritdoc}
     *
     * - **global** (_boolean_) Read or write configuration options for the current user
     * - **system** (_boolean_) Read or write configuration options for all users on the current machine
     */
    public function setDefaultOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'global' => false,
            'system' => false,
        ]);
    }

}
