// AI Writing Layer Interactive Showcase Logic

document.addEventListener('DOMContentLoaded', () => {
  // 1. Tab Navigation for Legal & Compliance
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab');

      tabButtons.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const targetContent = document.getElementById(targetId);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });

  // 2. Interactive Keyboard Simulation Data
  const SIMULATION_MODES = {
    chat: {
      appName: 'WhatsApp Chat',
      incoming: 'Are you coming to the product sync at 4 PM today?',
      replies: {
        concise: [
          'Yes, see you there!',
          'Can\'t make it today, sorry!',
          'Joining 10 mins late.'
        ],
        professional: [
          'Yes, I will be attending the sync at 4 PM.',
          'Unfortunately I have a prior client call. Can you share meeting notes?',
          'I\'ll join slightly late, please proceed as scheduled.'
        ],
        friendly: [
          'Yes absolutely, see you at 4! 🙌',
          'Hey! Caught up today, catch you tomorrow?',
          'Will be there in a bit!'
        ]
      }
    },
    email: {
      appName: 'Gmail Draft',
      incoming: 'Please review the attached contract and let us know your feedback.',
      replies: {
        concise: [
          'Subject: Contract Review\n\nReviewed and looks good to proceed.',
          'Subject: Contract Updates Needed\n\nPlease find minor edits attached.',
          'Subject: Acknowledgment\n\nReviewing now, will revert by EOD.'
        ],
        professional: [
          'Subject: Contract Review & Feedback\n\nDear Team,\n\nI have reviewed the agreement and find terms acceptable.\n\nWarm regards,\nLakhan',
          'Subject: Requested Modifications\n\nDear Team,\n\nPlease see our requested changes to Clause 4.\n\nBest regards,\nLakhan',
          'Subject: In Progress\n\nDear Team,\n\nOur legal counsel is reviewing the draft.\n\nWarm regards,\nLakhan'
        ],
        friendly: [
          'Subject: Contract looks great!\n\nHey team,\n\nEverything looks super solid. Excited to kick off!\n\nBest,\nLakhan',
          'Subject: Quick review note\n\nHey,\n\nMade a few minor notes in the doc for you.\n\nCheers,\nLakhan',
          'Subject: On it!\n\nReviewing this afternoon!\n\nBest,\nLakhan'
        ]
      }
    },
    translate: {
      appName: 'Telegram Messenger',
      incoming: 'Bhai kal meeting me kya discuss hua tha summary bhej de',
      replies: {
        concise: [
          'Could you send me a quick summary of yesterday\'s meeting?',
          'Please share yesterday\'s meeting notes.',
          'What were the key takeaways from yesterday?'
        ],
        professional: [
          'Could you kindly share the executive summary of yesterday\'s meeting discussion?',
          'Please forward the minutes of the meeting held yesterday at your convenience.',
          'I would appreciate receiving a brief recap of yesterday\'s meeting agenda.'
        ],
        friendly: [
          'Hey buddy! Could you send over a quick summary of what was discussed yesterday?',
          'Could you share yesterday\'s meeting highlights when free?',
          'Missed the sync! What did we cover yesterday?'
        ]
      }
    }
  };

  let currentMode = 'chat';
  let currentTone = 'concise';

  const chatContainer = document.getElementById('chatContainer');
  const appBadgeText = document.getElementById('appBadgeText');
  const replyCards = document.querySelectorAll('.reply-card');
  const toneChips = document.querySelectorAll('.tone-chip');
  const orbBtn = document.getElementById('aiOrbBtn');

  function updateSimulator() {
    const data = SIMULATION_MODES[currentMode];
    if (!data) return;

    if (appBadgeText) appBadgeText.textContent = data.appName;

    // Reset chat bubble with incoming message
    if (chatContainer) {
      chatContainer.innerHTML = `
        <div class="chat-bubble bubble-received">
          ${data.incoming.replace(/\n/g, '<br>')}
        </div>
      `;
    }

    // Update reply options
    const activeReplies = data.replies[currentTone] || data.replies.concise;
    replyCards.forEach((card, index) => {
      const textSpan = card.querySelector('.reply-text');
      if (textSpan && activeReplies[index]) {
        textSpan.textContent = activeReplies[index].replace(/\n\n/g, ' · ');
      }
    });
  }

  // Handle tone selection
  toneChips.forEach(chip => {
    chip.addEventListener('click', () => {
      toneChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      currentTone = chip.getAttribute('data-tone') || 'concise';
      updateSimulator();
    });
  });

  // Handle reply selection (click reply card -> sends to chat)
  replyCards.forEach((card, index) => {
    card.addEventListener('click', () => {
      const data = SIMULATION_MODES[currentMode];
      const activeReplies = data.replies[currentTone] || data.replies.concise;
      const selected = activeReplies[index];
      if (!selected) return;

      const sentBubble = document.createElement('div');
      sentBubble.className = 'chat-bubble bubble-sent';
      sentBubble.innerHTML = selected.replace(/\n/g, '<br>');
      chatContainer.appendChild(sentBubble);
      chatContainer.scrollTop = chatContainer.scrollHeight;
    });
  });

  // Cycle scenario on Orb click
  if (orbBtn) {
    orbBtn.addEventListener('click', () => {
      const modes = ['chat', 'translate', 'email'];
      const nextIndex = (modes.indexOf(currentMode) + 1) % modes.length;
      currentMode = modes[nextIndex];
      updateSimulator();
    });
  }

  // Initial render
  updateSimulator();
});
