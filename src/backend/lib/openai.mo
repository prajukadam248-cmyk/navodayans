import { defaultConfig; type Config } "mo:openai-client/Config";
import ChatApi "mo:openai-client/Apis/ChatApi";
import CreateChatCompletionRequest "mo:openai-client/Models/CreateChatCompletionRequest";
import ChatCompletionRequestUserMessage "mo:openai-client/Models/ChatCompletionRequestUserMessage";
import ChatCompletionRequestSystemMessage "mo:openai-client/Models/ChatCompletionRequestSystemMessage";
import Runtime "mo:core/Runtime";
import ChatCompletionRequestMessage "mo:openai-client/Models/ChatCompletionRequestMessage";

module {
  /// Build a Config bound to a single bearer.
  /// `is_replicated = ?false` is REQUIRED — security, billing, and non-determinism.
  public func configForKey(key : Text) : Config {
    {
      defaultConfig with
      auth = ?#bearer key;
      is_replicated = ?false;
    };
  };

  public func runChatCompletion(config : Config, prompt : Text) : async* Text {
    await* runChatCompletionWithSystem(config, "", prompt);
  };
  /// Chat completion with an explicit system prompt for persona/context.
  public func runChatCompletionWithSystem(config : Config, systemPrompt : Text, prompt : Text) : async* Text {
    let userMessage = ChatCompletionRequestUserMessage.JSON.init({
      content = #string(prompt);
      role = #user;
    });

    let messages : [ChatCompletionRequestMessage.ChatCompletionRequestMessage] = if (systemPrompt == "") {
      [#user(userMessage)];
    } else {
      let sysMessage = ChatCompletionRequestSystemMessage.JSON.init({
        content = #string(systemPrompt);
        role = #system_;
      });
      [#system_(sysMessage), #user(userMessage)];
    };

    let req = CreateChatCompletionRequest.JSON.init({
      messages;
      model = "gpt-4o-mini";
    });

    let resp = await* ChatApi.createChatCompletion(config, req);

    if (resp.choices.size() == 0) {
      Runtime.trap("OpenAI returned no choices");
    };
    switch (resp.choices[0].message.content) {
      case (?text) text;
      case null Runtime.trap("OpenAI returned no text content");
    };
  };
};
