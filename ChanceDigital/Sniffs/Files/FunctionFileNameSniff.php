<?php
namespace ChanceDigital\Sniffs\Files;

use PHP_CodeSniffer\Files\File;
use PHP_CodeSniffer\Sniffs\Sniff;

/**
 * Sniff to check for namespaced functions are in `namespace.php`.
 */
class FunctionFileNameSniff implements Sniff {
	public function register() {
		return array( T_FUNCTION );
	}

	public function process( File $phpcsFile, $stackPtr ) {
		$tokens = $phpcsFile->getTokens();

		if ( $tokens[ $stackPtr ]['level'] !== 0 ) {
			// Ignore methods.
			return;
		}

		$namespace = $phpcsFile->findNext( T_NAMESPACE , 0 );
		if ( empty( $namespace ) ) {
			// Non-namespaced function.
			return;
		}

		$namespace = '';
		$name_ptr = $phpcsFile->findNext( T_STRING, 0 );
		do {
			$namespace .= $tokens[ $name_ptr ]['content'];
			$name_ptr++;
		} while ( in_array( $tokens[ $name_ptr ]['code'], [ T_STRING, T_NS_SEPARATOR ] ) );
		$namespace_parts = explode( '\\', $namespace );
		$ns_part = array_pop( $namespace_parts );

		$filename = basename( $phpcsFile->getFileName() );
		$filename_pass = strtolower( str_replace( '_', '-', $ns_part ) ) . '.php';
		if ( $filename !== $filename_pass ) {
			$error = sprintf( 'Files containing namespaced functions must be named to match the final nested namespace in kebab-case format. Use %s', $filename_pass );
			$phpcsFile->addError( $error, $stackPtr, 'WrongFile' );
		}
	}
}
