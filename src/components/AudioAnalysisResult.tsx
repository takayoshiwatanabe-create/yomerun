import React from 'react';
import { View, Text, StyleSheet } from 'react-native'; // Assuming React Native context for these components
import { CheckCircle, XCircle, Star } from 'lucide-react-native'; // Assuming React Native context for these icons
import { useTranslations, useI18n } from '@/i18n';
 
interface AudioAnalysisResultProps {
  score: number;
  feedback: 'excellent' | 'good' | 'needs_practice';
  text: string;
}

export default function AudioAnalysisResult({ score, feedback, text }: AudioAnalysisResultProps) {
  const t = useTranslations('analysis');
  const { isRTL } = useI18n();

  const getScoreColor = (s: number) => {
    if (s >= 90) return '#28a745'; // Green
    if (s >= 70) return '#ffc107'; // Yellow
    return '#dc3545'; // Red
  };

  const scoreColor = getScoreColor(score);

  return (
    <View style={[styles.container, isRTL && styles.rtlContainer]}>
      <Text style={styles.title}>{t('resultTitle')}</Text>

      <View style={[styles.scoreContainer, isRTL && styles.rtlScoreContainer]}>
        <Star size={24} color={scoreColor} style={styles.starIcon} />
        <Text style={[styles.scoreLabel, isRTL ? { marginStart: 8, marginEnd: 0 } : { marginEnd: 8, marginStart: 0 }]}>{t('scoreLabel')}:</Text>
        <Text style={[styles.scoreValue, { color: scoreColor }]}>{score}%</Text>
      </View>

      <View style={[styles.feedbackContainer, isRTL && styles.rtlFeedbackContainer]}>
        {feedback === 'excellent' && <CheckCircle size={20} color="#28a745" style={[styles.feedbackIcon, isRTL ? { marginStart: 8, marginEnd: 0 } : { marginEnd: 8, marginStart: 0 }]} />}
        {feedback === 'good' && <Star size={20} color="#ffc107" style={[styles.feedbackIcon, isRTL ? { marginStart: 8, marginEnd: 0 } : { marginEnd: 8, marginStart: 0 }]} />}
        {feedback === 'needs_practice' && <XCircle size={20} color="#dc3545" style={[styles.feedbackIcon, isRTL ? { marginStart: 8, marginEnd: 0 } : { marginEnd: 8, marginStart: 0 }]} />}
        <Text style={styles.feedbackText}>{t(`feedback.${feedback}`)}</Text>
      </View>

      <Text style={[styles.originalText, isRTL && styles.rtlOriginalText]}>{text}</Text>

      {/* Example of logical properties for layout */}
      <View style={[
        styles.actionContainer, // Use logical properties for margin/padding
        isRTL ? { flexDirection: 'row-reverse', marginStart: 10 } : { flexDirection: 'row', marginEnd: 10 }
      ]}>
        {/* Action buttons would go here */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    margin: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
  },
  rtlContainer: {
    direction: 'rtl',
    textAlign: 'right',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  starIcon: {}, // No specific styling needed here, margin is handled by inline style
  scoreContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  rtlScoreContainer: {
    flexDirection: 'row-reverse', // Reverse order for RTL
  },
  scoreLabel: {
    fontSize: 18,
    fontWeight: '600',
    marginEnd: 8, // Use logical property for margin
  },
  scoreValue: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  feedbackContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#F0F4F8',
    borderRadius: 8,
    padding: 12,
  },
  rtlFeedbackContainer: {
    flexDirection: 'row-reverse', // Reverse order for RTL
  },
  feedbackIcon: {
    marginEnd: 8, // Use logical property for margin
  },
  feedbackText: {
    fontSize: 16,
    color: '#333',
    flexShrink: 1, // Allow text to wrap
  },
  originalText: {
    fontSize: 16,
    color: '#555',
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 20,
  },
  rtlOriginalText: {
    textAlign: 'right',
  },
  actionContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
});
