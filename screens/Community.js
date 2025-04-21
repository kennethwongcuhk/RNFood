import React, { useState, useEffect, useContext } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  ScrollView, 
  FlatList, 
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  RefreshControl
} from 'react-native';
import { addPost, fetchPosts, storeFood } from '../util/http';
import Button from '../components/UI/Button';
import { GlobalStyles } from '../constants/styles';
import { FoodContext } from '../store/food-context';
import IconButton from '../components/UI/IconButton';

function PostItem({ post, onImportFood }) {
  const formattedDate = post.date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  const isFoodPost = post.foodItem !== null;

  return (
    <View style={styles.postItem}>
      <View style={styles.postHeader}>
        <Text style={styles.username}>{post.username}</Text>
        <Text style={styles.date}>{formattedDate}</Text>
      </View>
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.content}>{post.content}</Text>
      
      {isFoodPost && (
        <View style={styles.importContainer}>
          <Text style={styles.importLabel}>Add this food item to your list?</Text>
          <IconButton 
            icon="plus" 
            color={GlobalStyles.colors.accent500}
            size={24}
            onPress={() => onImportFood(post.foodItem)}
          />
        </View>
      )}
    </View>
  );
}

export default function Community() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [title, setTitle] = useState('');
  const [username, setUsername] = useState('');
  const [content, setContent] = useState('');
  const [isImporting, setIsImporting] = useState(false);
  
  const foodCtx = useContext(FoodContext);

  async function loadPosts() {
    try {
      const fetchedPosts = await fetchPosts();
      setPosts(fetchedPosts.sort((a, b) => b.date - a.date));
    } catch (error) {
      Alert.alert('Error', 'Could not load posts');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }

  useEffect(() => {
    loadPosts();
  }, []);

  async function handleRefresh() {
    setIsRefreshing(true);
    await loadPosts();
  }

  async function handleImportFood(foodItem) {
    setIsImporting(true);
    try {
      const id = await storeFood(foodItem);
      foodCtx.addFood({ ...foodItem, id });
      Alert.alert(
        'Success', 
        `"${foodItem.description}" has been added to your food list!`
      );
    } catch (error) {
      Alert.alert('Error', 'Could not import the food item');
    } finally {
      setIsImporting(false);
    }
  }

  async function handleAddPost() {
    if (!title.trim() || !username.trim() || !content.trim()) {
      Alert.alert('Invalid input', 'Please fill in all fields');
      return;
    }

    setIsLoading(true);
    
    try {
      const postData = {
        title: title.trim(),
        username: username.trim(),
        content: content.trim(),
        date: new Date().toISOString(),
      };
      
      const id = await addPost(postData);
      
      // Add the new post to the state
      setPosts((currentPosts) => [
        {
          id,
          ...postData,
          date: new Date(postData.date),
          foodItem: null,
        },
        ...currentPosts,
      ]);
      
      // Clear form inputs
      setTitle('');
      setContent('');
      
      Alert.alert('Success', 'Your post has been published!');
    } catch (error) {
      Alert.alert('Error', 'Could not add your post');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.feedContainer}>
        {(isLoading && posts.length === 0) || isImporting ? (
          <ActivityIndicator size="large" color={GlobalStyles.colors.primary100} />
        ) : posts.length > 0 ? (
          <FlatList
            data={posts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <PostItem 
                post={item} 
                onImportFood={handleImportFood}
              />
            )}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={handleRefresh}
                tintColor={GlobalStyles.colors.primary100}
                colors={[GlobalStyles.colors.primary100]}
                progressBackgroundColor={GlobalStyles.colors.primary700}
              />
            }
          />
        ) : (
          <ScrollView 
            contentContainerStyle={styles.emptyState}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={handleRefresh}
                tintColor={GlobalStyles.colors.primary100}
                colors={[GlobalStyles.colors.primary100]}
                progressBackgroundColor={GlobalStyles.colors.primary700}
              />
            }
          >
            <Text style={styles.emptyStateText}>No posts yet. Be the first to post something!</Text>
          </ScrollView>
        )}
      </View>
      
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Share with the community</Text>
        <TextInput
          style={styles.input}
          placeholder="Your name"
          placeholderTextColor="#AAAAAA"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Post title"
          placeholderTextColor="#AAAAAA"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={[styles.input, styles.contentInput]}
          placeholder="What's on your mind?"
          placeholderTextColor="#AAAAAA"
          value={content}
          onChangeText={setContent}
          multiline
        />
        <Button onPress={handleAddPost} disabled={isLoading}>
          {isLoading ? 'Posting...' : 'Share Post'}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  feedContainer: {
    flex: 2,
    padding: 16,
  },
  inputContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: GlobalStyles.colors.primary700,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  inputLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: GlobalStyles.colors.primary50,
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary800,
    color: GlobalStyles.colors.primary50,
    borderRadius: 4,
    padding: 8,
    marginBottom: 12,
  },
  contentInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  postItem: {
    backgroundColor: GlobalStyles.colors.primary700,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  username: {
    fontWeight: 'bold',
    color: GlobalStyles.colors.accent500,
    fontSize: 16,
  },
  date: {
    color: GlobalStyles.colors.primary100,
    fontSize: 12,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 8,
    color: GlobalStyles.colors.primary50,
  },
  content: {
    color: GlobalStyles.colors.primary100,
    fontSize: 14,
  },
  importContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: GlobalStyles.colors.primary500,
  },
  importLabel: {
    color: GlobalStyles.colors.primary100,
    fontSize: 14,
    fontWeight: 'bold',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyStateText: {
    color: GlobalStyles.colors.primary100,
    textAlign: 'center',
    fontSize: 16,
  },
}); 