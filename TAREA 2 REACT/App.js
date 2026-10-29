import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  Alert,
  Button,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

const COLORS = {
  background: '#F3F5FA',
  border: '#E1E5EE',
  muted: '#758096',
  offline: '#B8C0CC',
  primary: '#5B5CE2',
  primaryLight: '#ECECFF',
  text: '#20243A',
  white: '#FFFFFF',
};

const BASE_FOLLOWERS = 1200;
const MAX_MESSAGE = 140;
const SKILLS = ['UI Design', 'UX Research', 'Prototyping', 'Figma', 'Accessibility'];

export default function App() {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isBioExpanded, setIsBioExpanded] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [selectedSkills, setSelectedSkills] = useState([]);

  const followers = BASE_FOLLOWERS + (isFollowing ? 1 : 0);
  const isSendDisabled = message.trim().length === 0;

  function handleFollowPress() {
    setIsFollowing(!isFollowing);
  }

  function handleMessagePress() {
    setIsComposerOpen(!isComposerOpen);
  }

  function handleSharePress() {
    Alert.alert('Share profile', 'Alex Morgan’s profile is ready to share.');
  }

  function handleSendPress() {
    Alert.alert('Message sent', message.trim());
    setMessage('');
    setIsComposerOpen(false);
  }

  function handleSkillPress(skill) {
    setSelectedSkills((currentSkills) =>
      currentSkills.includes(skill)
        ? currentSkills.filter((currentSkill) => currentSkill !== skill)
        : [...currentSkills, skill],
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.eyebrow}>CREATOR PROFILE</Text>

        <View style={styles.profileCard}>
          <View style={styles.avatarWrap}>
            <Pressable
              accessibilityLabel={`Toggle online status. Currently ${isOnline ? 'online' : 'offline'}`}
              accessibilityRole="button"
              onPress={() => setIsOnline(!isOnline)}
              style={({ pressed }) => [styles.avatar, pressed && styles.pressed]}
            >
              <Text style={styles.avatarInitials}>AM</Text>
            </Pressable>
            <View
              style={[styles.onlineBadge, !isOnline && styles.offlineBadge]}
            />
          </View>

          <Text style={styles.name}>Alex Morgan</Text>
          <Text style={styles.title}>Product Designer</Text>
          <Text style={styles.location}>San Francisco, CA</Text>

          <Text style={styles.bio} numberOfLines={isBioExpanded ? undefined : 3}>
            I’m a product designer who loves turning complex problems into
            simple, thoughtful experiences. I work across research, interaction
            design, and prototyping to help teams build products people enjoy
            using. Always learning, sharing ideas, and looking for the next
            interesting challenge.
          </Text>
          <Pressable
            accessibilityRole="button"
            onPress={() => setIsBioExpanded(!isBioExpanded)}
            style={({ pressed }) => pressed && styles.pressed}
          >
            <Text style={styles.link}>
              {isBioExpanded ? 'Show less' : 'Read more'}
            </Text>
          </Pressable>

          <View style={styles.stats}>
            <View style={styles.stat}>
              <Text style={styles.statValue}>
                {followers.toLocaleString('en-US')}
              </Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Text style={styles.statValue}>48</Text>
              <Text style={styles.statLabel}>Projects</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Text style={styles.statValue}>12</Text>
              <Text style={styles.statLabel}>Awards</Text>
            </View>
          </View>

          <View style={styles.actions}>
            <Pressable
              accessibilityRole="button"
              accessibilityState={{ selected: isFollowing }}
              onPress={handleFollowPress}
              style={({ pressed }) => [
                styles.followButton,
                isFollowing && styles.buttonFollowing,
                pressed && styles.pressed,
              ]}
            >
              <Text
                style={[
                  styles.followText,
                  isFollowing && styles.followTextFollowing,
                ]}
              >
                {isFollowing ? 'Following' : 'Follow'}
              </Text>
            </Pressable>
            <Pressable
              accessibilityRole="button"
              onPress={handleMessagePress}
              style={({ pressed }) => [
                styles.messageButton,
                pressed && styles.pressed,
              ]}
            >
              <Text style={styles.messageText}>
                {isComposerOpen ? 'Close' : 'Message'}
              </Text>
            </Pressable>
          </View>

          {isComposerOpen && (
            <View style={styles.composer}>
              <TextInput
                accessibilityLabel="Write a message"
                maxLength={MAX_MESSAGE}
                onChangeText={(newText) => setMessage(newText)}
                placeholder="Write a friendly message..."
                placeholderTextColor={COLORS.muted}
                style={styles.input}
                value={message}
              />
              <View style={styles.composerFooter}>
                <Text style={styles.counter}>
                  {message.length}/{MAX_MESSAGE} characters
                </Text>
                <Pressable
                  accessibilityRole="button"
                  accessibilityState={{ disabled: isSendDisabled }}
                  disabled={isSendDisabled}
                  onPress={handleSendPress}
                  style={({ pressed }) => [
                    styles.sendButton,
                    isSendDisabled && styles.sendButtonDisabled,
                    pressed && !isSendDisabled && styles.pressed,
                  ]}
                >
                  <Text style={styles.sendText}>Send</Text>
                </Pressable>
              </View>
            </View>
          )}

          <View style={styles.shareWrapper}>
            <Button
              color={COLORS.primary}
              onPress={handleSharePress}
              title="Share profile"
            />
          </View>
        </View>

        <View style={styles.skillsSection}>
          <Text style={styles.sectionTitle}>Skills</Text>
          <View style={styles.tags}>
            {SKILLS.map((skill) => {
              const selected = selectedSkills.includes(skill);

              return (
                <Pressable
                  accessibilityRole="button"
                  accessibilityState={{ selected }}
                  key={skill}
                  onPress={() => handleSkillPress(skill)}
                  style={({ pressed }) => [
                    styles.tag,
                    selected && styles.tagSelected,
                    pressed && styles.pressed,
                  ]}
                >
                  <Text
                    style={[
                      styles.tagText,
                      selected && styles.tagTextSelected,
                    ]}
                  >
                    {skill}
                  </Text>
                </Pressable>
              );
            })}
          </View>
          <Text style={styles.hint}>
            Tap a skill to select it · {selectedSkills.length} selected
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 36,
  },
  eyebrow: {
    marginBottom: 16,
    color: COLORS.muted,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.8,
  },
  profileCard: {
    width: '100%',
    maxWidth: 440,
    alignItems: 'center',
    padding: 24,
    borderRadius: 24,
    backgroundColor: COLORS.white,
    shadowColor: '#222A45',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 4,
  },
  avatarWrap: {
    position: 'relative',
    marginBottom: 14,
  },
  avatar: {
    width: 92,
    height: 92,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 46,
    backgroundColor: COLORS.primaryLight,
  },
  avatarInitials: {
    color: COLORS.primary,
    fontSize: 29,
    fontWeight: '700',
    letterSpacing: 1,
  },
  onlineBadge: {
    position: 'absolute',
    right: 3,
    bottom: 3,
    width: 18,
    height: 18,
    borderWidth: 3,
    borderColor: COLORS.white,
    borderRadius: 9,
    backgroundColor: '#35B779',
  },
  name: {
    color: COLORS.text,
    fontSize: 24,
    fontWeight: '700',
  },
  title: {
    marginTop: 4,
    color: COLORS.primary,
    fontSize: 15,
    fontWeight: '600',
  },
  location: {
    marginTop: 5,
    color: COLORS.muted,
    fontSize: 13,
  },
  bio: {
    alignSelf: 'stretch',
    marginTop: 20,
    color: COLORS.text,
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',
  },
  link: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
  },
  stats: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 22,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    color: COLORS.text,
    fontSize: 17,
    fontWeight: '700',
  },
  statLabel: {
    marginTop: 4,
    color: COLORS.muted,
    fontSize: 12,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: COLORS.border,
  },
  actions: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  followButton: {
    flex: 1,
    minHeight: 46,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    backgroundColor: COLORS.primary,
  },
  buttonFollowing: {
    backgroundColor: COLORS.primaryLight,
  },
  followText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: '700',
  },
  followTextFollowing: {
    color: COLORS.primary,
  },
  messageButton: {
    flex: 1,
    minHeight: 46,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    backgroundColor: COLORS.white,
  },
  messageText: {
    color: COLORS.text,
    fontSize: 15,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.6,
  },
  composer: {
    alignSelf: 'stretch',
    marginTop: 16,
  },
  input: {
    height: 44,
    paddingHorizontal: 12,
    fontSize: 15,
    color: COLORS.text,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
  },
  composerFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  counter: {
    fontSize: 12,
    color: COLORS.muted,
  },
  sendButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
  },
  sendButtonDisabled: {
    backgroundColor: COLORS.offline,
  },
  sendText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.white,
  },
  shareWrapper: {
    alignItems: 'center',
    marginTop: 12,
  },
  skillsSection: {
    width: '100%',
    maxWidth: 440,
    marginTop: 22,
    padding: 20,
    borderRadius: 20,
    backgroundColor: COLORS.white,
  },
  sectionTitle: {
    marginBottom: 14,
    color: COLORS.text,
    fontSize: 17,
    fontWeight: '700',
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 9,
  },
  tag: {
    paddingHorizontal: 13,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 18,
    backgroundColor: COLORS.white,
  },
  tagSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  tagText: {
    color: COLORS.text,
    fontSize: 13,
    fontWeight: '500',
  },
  tagTextSelected: {
    color: COLORS.white,
  },
  hint: {
    marginTop: 12,
    fontSize: 12,
    color: COLORS.muted,
  },
  offlineBadge: {
    backgroundColor: COLORS.offline,
  },
});
