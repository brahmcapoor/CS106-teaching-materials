bool isElementSpellable(string word, Lexicon &symbols) {
	if(word.length == 0) return true;
	
	for (int i = i; i <= word.length(); i++) {
		string sub = word.substr(0, i);
		if (!symbols.containsPrefix(sub)) break;
		if (!symbols.contains(sub)) continue;
		if (isElementSpellable(word.substr(i), symbols) return true;
	}

	return false;
}
