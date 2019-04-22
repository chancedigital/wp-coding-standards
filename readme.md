# Chance Digital WordPress Coding Standards
<a href="https://packagist.org/packages/chancedigital/wp-coding-standards"><img src="https://img.shields.io/packagist/v/chancedigital/wp-coding-standards.svg" /></a>
<img src="https://travis-ci.org/chancedigital/wp-coding-standards.svg?branch=master" alt="Build Status" />

This is a codified version of the Chance Digital PHP CodeSniffer rules. It began as a fork of the the [Human Made](https://github.com/chancedigital/wp-coding-standards) coding standards.

## Setup

1. `composer require --dev chancedigital/wp-coding-standards`
2. Run the following command to run the standards checks:

```
vendor/bin/phpcs --standard=vendor/chancedigital/wp-coding-standards .
```

The final `.` here specifies the files you want to test; this is typically the current directory (`.`), but you can also selectively check files or directories by specifying them instead.

You can add this to your Travis YAML file as a test:

```yaml
script:
	- phpunit
	- vendor/bin/phpcs --standard=vendor/chancedigital/wp-coding-standards .
```

### Excluding Files

This standard includes special support for a `.phpcsignore` file (in the future, this should be [built into phpcs itself](https://github.com/squizlabs/PHP_CodeSniffer/issues/1884)). Simply place a `.phpcsignore` file in your root directory (wherever you're going to run `phpcs` from).

The format of this file is similar to `.gitignore` and similar files: one pattern per line, comment lines should start with a `#`, and whitespace-only lines are ignored:

```
# Exclude our tests directory.
tests/

# Exclude any file ending with ".inc"
*\.inc
```

Note that the patterns should match [the PHP_CodeSniffer style](https://github.com/squizlabs/PHP_CodeSniffer/wiki/Advanced-Usage#ignoring-files-and-folders): `*` is translated to `.*` for convenience, but all other characters work like a regular expression.

Patterns are relative to the directory that the `.phpcsignore` file lives in. On load, they are translated to absolute patterns: e.g. `*/tests/*` in `/your/dir/.phpcsignore` will become `/your/dir/.*/tests/.*` as a regular expression. **This differs from the regular PHP_CodeSniffer practice.**


### Advanced/Extending

If you want to add further rules (such as WordPress.com VIP-specific rules), you can create your own custom standard file (e.g. `phpcs.ruleset.xml`):

```xml
<?xml version="1.0"?>
<ruleset>
	<!-- Use Chance Digital Coding Standards -->
	<rule ref="vendor/chancedigital/wp-coding-standards" />

	<!-- Add VIP-specific rules -->
	<rule ref="WordPress-VIP" />
</ruleset>
```

You can then reference this file when running phpcs:

```
vendor/bin/phpcs --standard=phpcs.ruleset.xml .
```

#### Excluding/Disabling Checks

You can also customise the rule to exclude elements if they aren't applicable to the project:

```xml
<rule ref="vendor/chancedigital/wp-coding-standards">
	<exclude name="ChanceDigital.Files.ClassFileNameSniff" />
</rule>
```

Rules can also be disabled inline. [phpcs rules can be disabled](https://github.com/squizlabs/PHP_CodeSniffer/wiki/Advanced-Usage#ignoring-parts-of-a-file) with a `// @codingStandardsIgnoreLine` comment.

To find out what these codes are, specify `-s` when running `phpcs`, and the code will be output as well. You can specify a full code, or a partial one to disable groups of errors.

## Included Checks

The phpcs standard is based upon the `WordPress-Extra` standard from [WordPress Coding Standards](https://github.com/WordPress-Coding-Standards/WordPress-Coding-Standards), with [customisation and additions](ChanceDigital/ruleset.xml) to match our style guide.

## Testing

### Running tests

To run the tests locally, you'll need the source version of PHP CodeSniffer.

If you haven't already installed your Composer dependencies:

```bash
composer install --prefer-source
```

If you already have, and need to convert the phpcs directory to a source version:

```bash
rm -r vendor/squizlabs/php_codesniffer
composer install --prefer-source
composer dump-autoload
```

### Writing sniff tests

To add tests you should mirror the directory structure of the sniffs. For example a test
for `ChanceDigital/Sniffs/Layout/OrderSniff.php` would require the following files:

```
ChanceDigital/Tests/Layout/OrderUnitTest.php # Unit test code
ChanceDigital/Tests/Layout/OrderUnitTest.inc # Code to be tested
```

Effectively you are replacing the suffix `Sniff.php` with `UnitTest.php`.

A basic unit test class looks like the following:

```php
<?php

namespace ChanceDigital\Tests\Layout;

use PHP_CodeSniffer\Tests\Standards\AbstractSniffUnitTest;

/**
 * Class name must follow the directory structure to be autoloaded correctly.
 */
class OrderUnitTest extends AbstractSniffUnitTest {

	/**
	 * Returns the lines where errors should occur.
	 *
	 * @return array <int line number> => <int number of errors>
	 */
	public function getErrorList() {
		return [
			1  => 1, // line 1 expects 1 error
		];
	}

	/**
	 * Returns the lines where warnings should occur.
	 *
	 * @return array <int line number> => <int number of warnings>
	 */
	public function getWarningList() {
		return [];
	}

}
```


### Fixture Tests

Rather than testing sniffs individually, `FixtureTests.php` also tests the files in the `tests/fixtures` directory and ensures that whole files pass.

To add an expected-pass file, simply add it into `tests/fixtures/pass` in the appropriate subdirectory/file.

To add an expected-fail file, add it into `tests/fixtures/fail` in the appropriate subdirectory/file. You then need to add the expected errors to the JSON file accompanying the tested file (i.e. the filename with `.json` appended). This file should contain a valid JSON object keyed by line number, with each item being a list of error objects:

```json
{
	"1": [
		{
			"source": "ChanceDigital.Files.FunctionFileName.WrongFile",
			"type": "error"
		}
	]
}
```

An error object contains:

* `source`: Internal phpcs error code; use the `-s` flag to `phpcs` to get the code.
* `type`: One of `error` or `warning`, depending on the check's severity.
