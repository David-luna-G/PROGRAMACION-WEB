import { useState } from 'react';
import {
  Alert,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const projects = ['Weather App', 'Task Tracker', 'Photo Gallery'];
const contacts = ['Ana', 'Ben', 'Carla', 'David'];

export default function App() {
  const [following, setFollowing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedContacts, setSelectedContacts] = useState([]);

  function closeModal() {
    setModalVisible(false);
    setSelectedContacts([]);
  }

  function toggleContact(name) {
    setSelectedContacts((current) =>
      current.includes(name)
        ? current.filter((contact) => contact !== name)
        : [...current, name]
    );
  }

  function shareProfile() {
    Alert.alert('Perfil compartido', `Enviado a: ${selectedContacts.join(', ')}`);
    closeModal();
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.page}>
        <View style={styles.card}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>AR</Text>
          </View>
          <Text style={styles.name}>Alex Rivera</Text>
          <Text style={styles.job}>Desarrollador móvil</Text>
          <Text style={styles.bio}>
            Creo aplicaciones y me gusta compartir lo que aprendo.
          </Text>

          <View style={styles.stats}>
            <Text style={styles.stat}>24 proyectos</Text>
            <Text style={styles.stat}>
              {following ? '1,201' : '1,200'} seguidores
            </Text>
          </View>

          <Pressable
            onPress={() => setFollowing(!following)}
            style={[styles.button, styles.followButton]}
          >
            <Text style={styles.buttonText}>
              {following ? 'Siguiendo' : 'Seguir'}
            </Text>
          </Pressable>

          <Text style={styles.heading}>Proyectos recientes</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {projects.map((project) => (
              <View key={project} style={styles.project}>
                <Text style={styles.projectText}>{project}</Text>
              </View>
            ))}
          </ScrollView>

          <Pressable
            onPress={() => setModalVisible(true)}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Compartir perfil</Text>
          </Pressable>
        </View>
      </ScrollView>

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={closeModal}
      >
        <View style={styles.overlay}>
          <Pressable style={StyleSheet.absoluteFill} onPress={closeModal} />
          <View style={styles.dialog}>
            <Text style={styles.dialogTitle}>Compartir perfil</Text>
            <Text style={styles.bio}>Elige a quién enviar el perfil:</Text>

            <ScrollView style={styles.contactList}>
              {contacts.map((name) => {
                const selected = selectedContacts.includes(name);
                return (
                  <Pressable
                    key={name}
                    onPress={() => toggleContact(name)}
                    style={styles.contact}
                  >
                    <Text style={styles.contactText}>{name}</Text>
                    <Text style={styles.contactText}>{selected ? '✓' : '○'}</Text>
                  </Pressable>
                );
              })}
            </ScrollView>

            <Pressable
              disabled={selectedContacts.length === 0}
              onPress={shareProfile}
              style={[
                styles.button,
                selectedContacts.length === 0 && styles.disabledButton,
              ]}
            >
              <Text style={styles.buttonText}>
                {selectedContacts.length
                  ? `Compartir con ${selectedContacts.length}`
                  : 'Elige contactos'}
              </Text>
            </Pressable>
            <Pressable onPress={closeModal} style={styles.cancel}>
              <Text style={styles.cancelText}>Cancelar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#eef1f6',
  },
  page: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    padding: 20,
    borderRadius: 20,
    backgroundColor: '#ffffff',
  },
  avatar: {
    width: 72,
    height: 72,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 36,
    backgroundColor: '#e6eeff',
  },
  avatarText: {
    color: '#2f6fed',
    fontSize: 24,
    fontWeight: '700',
  },
  name: {
    marginTop: 12,
    color: '#1b1f2a',
    fontSize: 24,
    fontWeight: '700',
  },
  job: {
    marginTop: 4,
    color: '#2f6fed',
    fontSize: 16,
  },
  bio: {
    marginTop: 12,
    color: '#6b7280',
    fontSize: 15,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 18,
  },
  stat: {
    color: '#1b1f2a',
    fontWeight: '600',
  },
  heading: {
    marginTop: 22,
    marginBottom: 10,
    color: '#6b7280',
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  project: {
    marginRight: 10,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#e6eeff',
  },
  projectText: {
    color: '#1b1f2a',
    fontWeight: '600',
  },
  button: {
    alignItems: 'center',
    marginTop: 16,
    padding: 14,
    borderRadius: 12,
    backgroundColor: '#2f6fed',
  },
  followButton: {
    marginTop: 0,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  dialog: {
    maxHeight: '80%',
    padding: 20,
    borderRadius: 20,
    backgroundColor: '#ffffff',
  },
  dialogTitle: {
    color: '#1b1f2a',
    fontSize: 22,
    fontWeight: '700',
  },
  contactList: {
    maxHeight: 200,
    marginTop: 12,
  },
  contact: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  contactText: {
    color: '#1b1f2a',
    fontSize: 16,
  },
  disabledButton: {
    backgroundColor: '#9ca3af',
  },
  cancel: {
    alignItems: 'center',
    padding: 12,
  },
  cancelText: {
    color: '#2f6fed',
    fontSize: 16,
    fontWeight: '600',
  },
});
