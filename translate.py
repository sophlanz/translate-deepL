import deepl

auth_key = "1c374654-4c5e-e24f-4901-ecaed0a3a479:fx"  
translator = deepl.Translator(auth_key)

result = translator.translate_text("I want you to listen to me", target_lang="ES")
print(result.text) 