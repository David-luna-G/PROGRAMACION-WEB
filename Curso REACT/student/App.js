// Profile Card — practical task (React Native basics)
// Follow the steps in README.md and build your solution in this file.
import { View, Text, Image, StyleSheet, Platform } from 'react-native';

// Data to display. Do not change it.
const BIO =
  'Building cross-platform apps with React Native. I love clean layouts, accessible design and sharing what I learn with the community.';

const STATS = [
  { label: 'Projects', value: '24' },
  { label: 'Followers', value: '1.2k' },
  { label: 'Following', value: '180' },
];

const SKILLS = ['React Native', 'JavaScript', 'UI Design', 'Git', 'Flexbox'];

const COLORS = {
  background: '#EEF1F6',
  card: '#FFFFFF',
  text: '#1F2430',
  muted: '#737C8D',
  primary: '#3478F6',
  primaryLight: '#E8F0FF',
  border: '#E0E4EB',
  online: '#20C46B',
};

export default function App() {
  return (
    <View style={styles.screen}>
      <View style={styles.card}>
        <Image
          style={styles.banner}
          resizeMode="cover"
          source={require('./assets/banner.png')}
        />

        <View style={styles.headerRow}>
          <View style={styles.avatarContainer}>
            <Image
              style={styles.avatar}
              source={require('./assets/avatar.png')}
            />
            <View style={styles.onlineBadge} />
          </View>
          <View style={styles.headerText}>
            <Text style={styles.name}>Alex Rivera</Text>
            <Text style={styles.role}>Mobile Developer</Text>
            <Text style={styles.location}>Lisbon, Portugal</Text>
          </View>
        </View>

        <Text style={styles.bio} numberOfLines={3}>
          {BIO}
        </Text>

        <View style={styles.statsRow}>
          {STATS.map((stat, index) => (
            <View
              key={stat.label}
              style={[styles.stat, index > 0 && styles.statDivider]}
            >
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.skills}>
          {SKILLS.map((skill) => (
            <View key={skill} style={styles.skillTag}>
              <Text style={styles.skillText}>{skill}</Text>
            </View>
          ))}
        </View>

        <View style={styles.actions}>
          <View style={[styles.button, styles.followButton]}>
            <Text style={[styles.buttonText, styles.followButtonText]}>
              Follow
            </Text>
          </View>
          <View style={[styles.button, styles.messageButton]}>
            <Text style={[styles.buttonText, styles.messageButtonText]}>
              Message
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: COLORS.background,
  },
  card: {
    width: '100%',
    maxWidth: 420,
    alignSelf: 'center',
    paddingBottom: 20,
    overflow: 'hidden',
    borderRadius: 20,
    backgroundColor: COLORS.card,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.text,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.12,
        shadowRadius: 16,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  banner: {
    width: '100%',
    height: 120,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: -48,
    paddingHorizontal: 20,
  },
  avatarContainer: {
    width: 96,
    height: 96,
  },
  avatar: {
    width: 96,
    height: 96,
    borderWidth: 4,
    borderColor: COLORS.card,
    borderRadius: 48,
  },
  onlineBadge: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 18,
    height: 18,
    borderWidth: 2,
    borderColor: COLORS.card,
    borderRadius: 9,
    backgroundColor: COLORS.online,
  },
  headerText: {
    flex: 1,
    marginLeft: 16,
    paddingTop: 48,
  },
  name: {
    color: COLORS.text,
    fontSize: 24,
    fontWeight: '700',
  },
  role: {
    marginTop: 2,
    color: COLORS.primary,
    fontSize: 17,
    fontWeight: '600',
  },
  location: {
    marginTop: 2,
    color: COLORS.muted,
    fontSize: 15,
  },
  bio: {
    marginTop: 20,
    marginHorizontal: 20,
    color: COLORS.text,
    fontSize: 16,
    lineHeight: 23,
  },
  statsRow: {
    flexDirection: 'row',
    marginTop: 20,
    marginHorizontal: 20,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    borderLeftWidth: 1,
    borderColor: COLORS.border,
  },
  statValue: {
    color: COLORS.text,
    fontSize: 20,
    fontWeight: '700',
  },
  statLabel: {
    marginTop: 3,
    color: COLORS.muted,
    fontSize: 13,
  },
  skills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 18,
    marginHorizontal: 20,
  },
  skillTag: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: COLORS.primaryLight,
  },
  skillText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 22,
    marginHorizontal: 20,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
    borderWidth: 1,
    borderRadius: 12,
  },
  followButton: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary,
  },
  messageButton: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.card,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  followButtonText: {
    color: COLORS.card,
  },
  messageButtonText: {
    color: COLORS.primary,
  },
});
