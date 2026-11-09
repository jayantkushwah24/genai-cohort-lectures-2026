# Introduction to GenAI

## what is ai?

- we give some input to ai and ai gives us some output
- ai engine can take input in natural language as input and give output in natural language

## GPT/LLM

- gpt is engine of car and chatgpt is body of car
- gpt = generative pretrained transformer => a transformer which is pretrained and is capable of generating new content

## transformer model

**STEP 1** - tokenization.

- natural language-> number (tokens)
- Hello, I am Jayant Kushwah => Uint32Array(9) [15496, 11, 314,716, 9180, 415,18995, 86, 993]

**STEP 2** - Embeddings

- create 3d mapping of words

**STEP 3** - Positional encoding

- add extra data about the postions so that two different sentences with different postion you get different postions 

#### **self attension** is a mechanism where we let tokens to talk to each other and change their meaning

---

# Foundations of Generative AI and Transformers

## What is Generative AI?

Generative AI (GenAI) refers to systems that learn patterns from examples and use those patterns to create new content. Depending on the model, that content can be text, images, audio, video, code, or structured data.

Traditional software often follows rules written explicitly by a developer:

> input + programmed rules → output

A generative model instead learns statistical patterns from training data:

> input (prompt) + learned model → generated output

The model does not retrieve a perfect answer from a database by default. It generates an answer based on its learned patterns, the current input, and its configuration.

## AI, machine learning, and deep learning

- **Artificial intelligence (AI)** is the broad field of building systems that perform tasks associated with intelligence.
- **Machine learning (ML)** is a branch of AI in which a system learns patterns from data rather than relying only on hand-written rules.
- **Deep learning** is a type of ML that uses neural networks with many layers to learn complex patterns.
- **Generative AI** uses learned patterns to produce new content. Large language models (LLMs) are generative AI systems focused primarily on language.

## What is an LLM?

A **large language model** is a neural network trained on large collections of text (and, in multimodal models, other kinds of data). It processes text as tokens and learns to predict likely next tokens.

**GPT** stands for **Generative Pre-trained Transformer**:

- **Generative**: produces new sequences of tokens.
- **Pre-trained**: first learns broad patterns from a large training corpus.
- **Transformer**: uses the transformer neural-network architecture.

GPT is a model family or model, while ChatGPT is an application that uses models along with a user interface, instructions, and other product features. An application may also connect a model to tools or external sources.

## How an AI engine produces a response

A simplified text-generation flow looks like this:

1. **Prepare the request.** The application combines the user's message with applicable instructions and conversation history.
2. **Tokenize the input.** Text is divided into tokens, and each token is represented by an integer ID.
3. **Convert tokens to vectors.** The model looks up a learned embedding vector for each token and adds information about token position.
4. **Process the sequence.** Transformer layers repeatedly use attention and neural-network computations to build context-aware representations.
5. **Score possible next tokens.** The model produces a score (logit) for each token in its vocabulary.
6. **Choose a next token.** A decoding strategy, influenced by settings such as temperature, selects one token from the scores.
7. **Continue generation.** The selected token is added to the sequence, and the model predicts another token. This continues until a stopping condition is reached.
8. **Return the result.** The application converts generated token IDs back to readable text and presents the response.

This is a simplified description: real systems can include additional stages such as safety checks, tool calls, retrieval, multimodal processing, and output formatting.

## Foundations & Transformers

### 1. Tokenization

**Tokenization** turns text into units the model can process. A token may be a whole word, part of a word, punctuation, whitespace, or another text unit. Token boundaries depend on the tokenizer; they do not necessarily match words or characters.

For example, a word the tokenizer has seen often may be represented by one token, while an uncommon word may be split into several tokens. The model operates on token IDs, not directly on human-readable words.

Why tokenization matters:

- The number of tokens affects how much text fits into a model's context window.
- Different languages, symbols, and code can use different numbers of tokens for similar-looking lengths of text.
- A token ID has meaning only within the tokenizer and vocabulary used by that model.

### 2. Embeddings

An **embedding** is a learned vector: a list of numbers that represents a token in a form a neural network can process. Embeddings are not literal 3D maps. They usually have many dimensions, and their geometry can capture useful patterns and relationships learned during training.

The embedding for a token is only an initial representation. As the token passes through transformer layers, its representation is updated using surrounding context. Thus, the same token can acquire different context-dependent representations in different sentences.

### 3. Positional information

Attention by itself does not inherently know the order in which tokens appeared. Transformers therefore include **positional information** so the model can distinguish sequences with different ordering.

Positional information may be added to token representations or incorporated into attention in other ways, depending on the model. The exact method varies, but its purpose is to help the model use token order and distance.

### 4. Self-attention

**Self-attention** lets each token use information from other relevant tokens in the same input sequence. It helps the model represent relationships such as which name a pronoun refers to or how a word is being used in a sentence.

At a high level, attention compares tokens to determine which other tokens are useful for the current representation, then combines information from them. Transformer attention is commonly described using:

- **Query**: what information a token is looking for.
- **Key**: what information a token offers for matching.
- **Value**: the information that can be used if the token is relevant.

These are learned vector transformations, not conscious questions or decisions. In a typical decoder-style language model, a causal attention mask prevents a position from using future tokens while generating the next token.

### 5. Transformer layers and feed-forward networks

A transformer stacks layers that commonly include attention, feed-forward neural-network computations, and supporting operations such as normalization and residual connections. Attention exchanges information across token positions; feed-forward layers further transform each position's representation.

Many transformer models use multiple **attention heads**. Different heads can learn to represent different kinds of relationships, though their behavior is learned and is not necessarily neatly interpretable by people.

## Context windows

A model's **context window** is the maximum amount of tokenized input and generated text that it can consider within one processing request. It is measured in tokens, not pages or words.

The context can include the current prompt, conversation history, system or application instructions, and sometimes tool or retrieved content. All of these may compete for the available token budget.

If relevant information is omitted or falls outside the usable context, the model may not take it into account. A larger context window allows more material to be considered, but it does not guarantee that every detail will be used accurately.

## From scores to generated text

After processing the current context, the model assigns scores called **logits** to possible next tokens. Converting these scores into a probability distribution and selecting a token is called **decoding** or **sampling**, depending on the method.

The model then appends the chosen token to the sequence and repeats the prediction process. This explains why a response is generated piece by piece and why changing earlier context can change later output.

### Temperature

**Temperature** adjusts how concentrated or spread out the next-token probability distribution is during sampling:

- A lower temperature makes selection more concentrated on the most likely tokens, often producing more predictable wording.
- A higher temperature spreads probability more broadly, often producing more varied wording.

Temperature does not add knowledge or make a model understand a prompt better. Its effect depends on the decoding setup, and it may have little or no effect when the system uses a deterministic selection method.

### Other decoding controls

- **Top-p (nucleus sampling)** limits sampling to a set of likely tokens whose cumulative probability reaches a chosen threshold.
- **Top-k** limits sampling to the k highest-scoring candidate tokens.
- **Maximum output tokens** limits how long the generated response can be.
- **Stop sequences** tell a system when to stop generation.

These controls affect how text is selected, not what the model learned during training.

## How models learn

Training generally involves adjusting a model's parameters so that its predictions better match examples in the training data.

1. **Pre-training:** A model learns broad statistical patterns, commonly by predicting missing or next tokens across a large dataset.
2. **Fine-tuning and alignment:** Additional training can adapt a model to tasks, instructions, or preferred response styles. Human feedback or other evaluation methods may be part of this process.
3. **Inference:** Once trained, the model uses its learned parameters to process a request and generate an output. Inference is the response-generation stage, not the same as training.

The exact data and training methods vary by model. Training does not mean the model stores a reliable, searchable copy of every example or can explain the source of every response.

## Prompting and conversation

A **prompt** is the input that guides a model's response. Clear prompts often specify:

- The task and desired outcome.
- Relevant context and constraints.
- The intended audience and level of detail.
- The expected format, such as a list, table, or code block.

In a chat application, the model may receive more than the latest message: the application can include conversation history and instructions that shape how the model responds. The model can only use information made available to it in that request or through tools it is allowed to use.

## Capabilities and limitations

LLMs can summarize, explain, draft, transform text, classify content, and assist with code. However, fluent language is not proof that a statement is true.

- **Hallucinations:** A model may produce plausible-sounding but incorrect or unsupported claims.
- **Knowledge limits:** A model may not know recent events or private information unless that information is supplied or retrieved.
- **Ambiguity:** Vague prompts can lead to responses that do not match the user's intent.
- **Sensitivity to wording:** Small changes to a prompt or context can change the output.
- **Bias and uneven performance:** Model behavior can reflect limitations or biases in training data and evaluation.
- **No guaranteed reasoning:** A convincing explanation is not, by itself, proof that the answer or reasoning is correct.

For important decisions, verify claims with reliable sources, test generated code, and provide appropriate human review.

## Grounding and tools

An application can provide a model with relevant information from documents, databases, or web search. This is often called **retrieval-augmented generation (RAG)**: the application retrieves material and includes it in the model's context so the response can be grounded in that material.

Some applications also let models call tools, such as a calculator or code runner. The model may request a tool call, the application executes it, and the result is then supplied back to the model. Tool availability and permissions are controlled by the application; a language model does not automatically have access to the internet, files, or other systems.

## Multimodal AI

Text-only models process text tokens. **Multimodal models** can work with more than one type of input or output, such as text, images, audio, or video. These types of data may be converted into internal representations that the model can process alongside text. The specific capabilities and processing methods differ between models.

## Key terms at a glance

| Term | Meaning |
|---|---|
| Token | A unit of text or other data represented for model processing |
| Tokenizer | The component that maps input text to token IDs and back |
| Embedding | A learned vector representation of a token or other input |
| Attention | A mechanism for combining information across relevant positions |
| Transformer | A neural-network architecture built around attention and related layers |
| Context window | The token capacity available to a model for one request |
| Logit | A raw score the model assigns to a possible next token |
| Temperature | A sampling setting that changes the distribution used to choose tokens |
| Inference | Using a trained model to produce an output |
| Hallucination | Plausible-sounding generated content that may be false or unsupported |

## A simple mental model

Think of a language model as a system that repeatedly answers this question:

> Given the tokens so far, what token should come next?

It uses learned parameters and the available context to score possible continuations. Repeating this process produces a complete response. This mental model is useful for understanding generation, but it is a simplification of the computations inside a neural network and does not imply human-like understanding.
