
<script>
  import { onMount, afterUpdate } from 'svelte';

  let messages = [];
  let newMessage = '';
  let messageContainer;

  const sendMessage = () => {
    if (newMessage.trim() !== '') {
      messages = [...messages, newMessage];
      newMessage = '';
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  onMount(() => {
    document.getElementById('messageInput').focus();
  });

  afterUpdate(() => {
    if (messageContainer) {
      messageContainer.scrollTop = messageContainer.scrollHeight;
    }
  });
</script>

<main class="flex justify-center items-center h-screen bg-red-900">
  <!-- Div for Main chat window -->
  <div class="relative w-[70vw] max-w-full h-[80vh] min-h-[100px] bg-white rounded-lg shadow-lg flex flex-col overflow-hidden p-1">
    <!-- Div for chat window header -->
    <div class="absolute top-0 left-0 right-0 flex flex-row overflow-hidden p-4 h-[12vh] bg-gray-200 rounded-t-lg shadow-lg">
      <div class="flex-shrink-0">
        <img class="w-35 h-16 object-contain" src="https://adroitoverseas.com/_app/immutable/assets/adroit-logo.0943aef4.svg" alt="Adroit PFP">
      </div>
      <div class="flex flex-col overflow-hidden pl-6">
        <p class="text-gray-600 pb-4">Chat with</p>
        <p class="text-lg font-semibold">ADRIBOT</p>
      </div>
    </div>
    <!-- Div for message display area -->
    <div class="flex-grow overflow-y-auto p-5 messages mt-[12vh]" bind:this={messageContainer} style="max-height: calc(80vh - 12vh - 2rem - 3rem);">
      {#each messages as message}
        <div class="text-xs bg-gray-200 mb-2 p-2 rounded-[15px] font-sans float-right clear-both inline-block max-w-[80%] break-words animate-fade-in">{message}</div>
      {/each}
    </div>
    <!-- Div for bottom section -->
    <div class="flex p-3">
      <input
        type="text"
        id="messageInput"
        bind:value={newMessage}
        on:keydown={handleKeyDown}
        placeholder="Ask me anything..."
        class="flex-grow border-none rounded-full p-3 outline-none bg-gray-200 font-sans text-xs shadow-lg"
      />
      <button on:click={sendMessage} class="ml-2 p-2 bg-gray-500 text-white border-none rounded-full shadow-lg cursor-pointer transition-colors duration-300 hover:bg-gray-700">
        <img src="https://cdn.iconfinder.com/stored_data/1755974/128/png?token=1718907705-MjcA%2B9Nxzg%2B2HOUxMCh7bCTIAu4OwZFle4Qrz2tHbZ0%3D" alt="Send" class="w-4 h-4">
      </button>
    </div>
  </div>
</main>





